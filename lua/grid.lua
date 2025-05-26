local config = require "config"

local Grid = {}
Grid.__index = Grid

function Grid.new()
    local self = setmetatable({}, Grid)
    self.cells = {}
    for y = 1, config.gridHeight do
        self.cells[y] = {}
    end
    return self
end

function Grid:deepcopyRow(row)
    local copy = {}
    for x, v in pairs(row) do
        copy[x] = v
    end
    return copy
end

function Grid:canMove(block, dx, dy, rot)
    local shape = config.blockTypes[block.type][rot or block.rotation]
    for _, cell in ipairs(shape) do
        local x = block.pos.x + cell[1] + dx
        local y = block.pos.y + cell[2] + dy
        if x < 1 or x > config.gridWidth or y > config.gridHeight then
            return false
        end
        if y > 0 and self.cells[y] and self.cells[y][x] then
            return false
        end
    end
    return true
end

function Grid:lockBlock(block)
    for _, cell in ipairs(block.shape) do
        local x = block.pos.x + cell[1]
        local y = block.pos.y + cell[2]
        if y > 0 then
            self.cells[y][x] = block.type
        end
    end
end

function Grid:clearLines()
    local linesCleared = 0
    for y = config.gridHeight, 1, -1 do
        local full = true
        for x = 1, config.gridWidth do
            if not self.cells[y][x] then
                full = false
                break
            end
        end
        if full then
            for yy = y, 2, -1 do
                self.cells[yy] = self:deepcopyRow(self.cells[yy - 1])
            end
            self.cells[1] = {}
            for x = 1, config.gridWidth do
                self.cells[1][x] = nil
            end
            y = y + 1
            linesCleared = linesCleared + 1
        end
    end
    return linesCleared
end

function Grid:reset()
    for y = 1, config.gridHeight do
        self.cells[y] = {}
    end
end

return Grid
