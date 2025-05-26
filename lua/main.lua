local config = require "config"
local Game = require "game"

local game

function love.load()
    love.window.setTitle("Tetris")
    love.window.setMode(config.gridWidth * config.cellSize, config.gridHeight * config.cellSize)
    game = Game.new()
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
