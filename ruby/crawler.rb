#!/usr/bin/env ruby

require "nokogiri"
require "open-uri"
require "json"

Product = Struct.new(:title, :price) do
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
    search_url = "#{AMAZON_URL}/s?k=#{@keywords}"
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
      
      title_element = item.at_css("h2")
      price_element = item.at_css(".a-price .a-offscreen")
      
      if title_element && price_element
        products << Product.new(
          title_element.text.strip,
          price_element.text.strip
        )
      end
    end
    products
  end
end

if ARGV.empty?
  puts "Usage: ruby crawler.rb <keyword>"
  exit
end

formatted_keywords = ARGV.join(" ")
scraper = AmazonScraper.new(formatted_keywords)
products = scraper.scrape

puts JSON.pretty_generate(products)
