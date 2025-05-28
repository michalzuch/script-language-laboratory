local config = require "config"
local Game = require "game"

local game
local sounds = {}

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
