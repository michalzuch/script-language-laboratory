#!/usr/bin/env ruby

require "nokogiri"
require "open-uri"
require "json"
require "cgi"
require "sqlite3"

Product = Struct.new(:title, :price, :asin, :dimensions, :url) do
  def to_json(*options)
    to_h.to_json(*options)
  end
end

class AmazonScraper
  AMAZON_URL = "https://www.amazon.pl"
  USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  MAX_PRODUCTS = 3

  def initialize(keywords)
    @keywords = keywords.strip
    raise ArgumentError, "Keywords cannot be empty" if @keywords.empty?
  end

  def scrape
    page = fetch_search_results
    validate_search_results(page)
    parse_products(page)
  end

  private

  def fetch_search_results
    encoded_keywords = CGI.escape(@keywords)
    search_url = "#{AMAZON_URL}/s?k=#{encoded_keywords}"
    headers = { 'User-Agent' => USER_AGENT }
    Nokogiri::HTML(URI.open(search_url, headers))
  rescue OpenURI::HTTPError => e
    puts "HTTP Error: #{e.message}"
    exit
  rescue StandardError => e
    puts "Error fetching results: #{e.message}"
    exit
  end

  def validate_search_results(page)
    unless page.at_css(".s-search-results .s-result-item")
      puts "No results found for: #{@keywords}"
      exit
    end
  end

  def parse_products(page)
    return [] unless page

    products = []
    page.css(".s-result-item").each do |item|
      break if products.length >= MAX_PRODUCTS
      next unless item.is_a?(Nokogiri::XML::Element)
      asin = item['data-asin']
      next if asin.nil? || asin.strip.empty?

      title_element = item.at_css("h2")
      price_element = item.at_css(".a-price .a-offscreen")

      if title_element && price_element
        dimensions = scrape_dimensions(asin)
        url = "#{AMAZON_URL}/dp/#{asin}"
        products << Product.new(
          title_element.text.strip,
          price_element.text.strip,
          asin,
          dimensions,
          url
        )
        sleep(rand(0.5..1.2))
      end
    end
    products
  end

  def scrape_dimensions(asin)
    url = "#{AMAZON_URL}/dp/#{asin}"
    headers = { 'User-Agent' => USER_AGENT }
    begin
      doc = Nokogiri::HTML(URI.open(url, headers))
    rescue OpenURI::HTTPError => e
      puts "Error loading product page for ASIN #{asin}: #{e.message}"
      return nil
    end

    dimension = nil

    doc.css('#productDetails_techSpec_section_1 tr').each do |row|
      key = row.at_css('th')&.text&.strip
      value = row.at_css('td')&.text&.strip
      if key&.downcase&.include?('wymiary') || key&.downcase&.include?('dimensions')
        dimension = value
        break
      end
    end

    if dimension.nil?
      doc.css('#prodDetails tr').each do |row|
        key = row.at_css('td.label')&.text&.strip
        value = row.at_css('td.value')&.text&.strip
        if key&.downcase&.include?('wymiary') || key&.downcase&.include?('dimensions')
          dimension = value
          break
        end
      end
    end

    dimension
  end
end

def save_products_to_sqlite(products, db_path = "products.db")
  db = SQLite3::Database.new(db_path)
  db.execute <<-SQL
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      price TEXT,
      asin TEXT UNIQUE,
      dimensions TEXT,
      url TEXT
    );
  SQL

  products.each do |product|
    begin
      db.execute(
        "INSERT OR IGNORE INTO products (title, price, asin, dimensions, url) VALUES (?, ?, ?, ?, ?)",
        [product.title, product.price, product.asin, product.dimensions, product.url]
      )
    rescue SQLite3::Exception => e
      puts "DB error: #{e.message}"
    end
  end

  db.close
end

if ARGV.empty?
  puts "Usage: ruby crawler.rb <keyword>"
  exit
end

formatted_keywords = ARGV.join(" ")
scraper = AmazonScraper.new(formatted_keywords)
products = scraper.scrape

puts JSON.pretty_generate(products)

save_products_to_sqlite(products)
puts "Saved #{products.size} products to SQLite database."
