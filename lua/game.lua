local config = require "config"
local Block = require "block"
local Grid = require "grid"

local Game = {}
Game.__index = Game

function Game.new()
    local self = setmetatable({}, Game)
    self.grid = Grid.new()
    self.currentBlock = Block.new()
    self.dropTimer = 0
    self.dropInterval = 0.5
    self.gameOver = false
    return self
end

function Game:spawnBlock()
    self.currentBlock = Block.new()
    if not self.grid:canMove(self.currentBlock, 0, 0) then
        self.gameOver = true
    end
end

function Game:update(dt)
    if self.gameOver then
        return
    end
    self.dropTimer = self.dropTimer + dt
    if self.dropTimer >= self.dropInterval then
        self.dropTimer = 0
        if self.grid:canMove(self.currentBlock, 0, 1) then
            self.currentBlock.pos.y = self.currentBlock.pos.y + 1
        else
            self.grid:lockBlock(self.currentBlock)
            self.grid:clearLines()
            self:spawnBlock()
        end
    end
end

function Game:keypressed(key)
    if self.gameOver then
        if key == "return" then
            self.grid:reset()
            self.gameOver = false
            self:spawnBlock()
        end
        return
    end
    local block = self.currentBlock
    if key == "left" and self.grid:canMove(block, -1, 0) then
        block.pos.x = block.pos.x - 1
    elseif key == "right" and self.grid:canMove(block, 1, 0) then
        block.pos.x = block.pos.x + 1
    elseif key == "down" and self.grid:canMove(block, 0, 1) then
        block.pos.y = block.pos.y + 1
    elseif key == "up" then
        local nextRot = (block.rotation % #config.blockTypes[block.type]) + 1
        if self.grid:canMove(block, 0, 0, nextRot) then
            block:setRotation(nextRot)
        end
    elseif key == "space" then
        while self.grid:canMove(block, 0, 1) do
            block.pos.y = block.pos.y + 1
        end
        self.grid:lockBlock(block)
        self.grid:clearLines()
        self:spawnBlock()
    end
end

function Game:draw()
    local cellSize = config.cellSize
    for y = 1, config.gridHeight do
        for x = 1, config.gridWidth do
            if self.grid.cells[y][x] then
                love.graphics.setColor(config.blockColors[self.grid.cells[y][x]])
                love.graphics.rectangle("fill", (x - 1) * cellSize, (y - 1) * cellSize, cellSize - 1, cellSize - 1)
            end
        end
    end
    if not self.gameOver then
        love.graphics.setColor(config.blockColors[self.currentBlock.type])
        for _, cell in ipairs(self.currentBlock.shape) do
            local x = self.currentBlock.pos.x + cell[1]
            local y = self.currentBlock.pos.y + cell[2]
            if y > 0 then
                love.graphics.rectangle("fill", (x - 1) * cellSize, (y - 1) * cellSize, cellSize - 1, cellSize - 1)
            end
        end
    end
    love.graphics.setColor(0.2, 0.2, 0.2)
    for y = 0, config.gridHeight do
        love.graphics.line(0, y * cellSize, config.gridWidth * cellSize, y * cellSize)
    end
    for x = 0, config.gridWidth do
        love.graphics.line(x * cellSize, 0, x * cellSize, config.gridHeight * cellSize)
    end
    if self.gameOver then
        love.graphics.setColor(1, 0, 0)
        love.graphics.printf("GAME OVER\nPress Enter to Restart", 0, config.gridHeight * cellSize / 2 - 30,
            config.gridWidth * cellSize, "center")
    end
end

return Game
