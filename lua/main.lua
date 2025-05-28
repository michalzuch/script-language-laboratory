local config = require "config"
local Game = require "game"

local game
local sounds = {}
local lastTouchY = {}

function love.load()
    love.window.setTitle("Tetris")
    love.window.setMode(config.gridWidth * config.cellSize, config.gridHeight * config.cellSize)

    sounds.lock = love.audio.newSource("sounds/lock.wav", "static")
    sounds.clear = love.audio.newSource("sounds/clear.wav", "static")
    sounds.gameover = love.audio.newSource("sounds/gameover.wav", "static")

    game = Game.new(sounds)
end

function love.update(dt)
    game:update(dt)
end

function love.keypressed(key)
    if key == "s" then
        game:save()
    elseif key == "l" then
        game:load()
    else
        game:keypressed(key)
    end
end

function love.draw()
    game:draw()
end

function love.touchpressed(id, x, y, dx, dy, pressure)
    local width, height = love.graphics.getWidth(), love.graphics.getHeight()
    local px = x * width
    local py = y * height
    lastTouchY[id] = py

    if px < width / 3 then
        game:keypressed("left")
    elseif px > width * 2 / 3 then
        game:keypressed("right")
    elseif py < height / 2 then
        game:keypressed("up")
    else
        game:keypressed("down")
    end
end

function love.touchmoved(id, x, y, dx, dy, pressure)
    local width, height = love.graphics.getWidth(), love.graphics.getHeight()
    local py = y * height
    if lastTouchY[id] and (py - lastTouchY[id]) > 100 then
        game:keypressed("space")
        lastTouchY[id] = nil
    end
end

function love.touchreleased(id, x, y, dx, dy, pressure)
    lastTouchY[id] = nil
end
