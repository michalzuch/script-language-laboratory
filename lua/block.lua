local config = require "config"

local Block = {}
Block.__index = Block

function Block.new(typeIndex)
    local self = setmetatable({}, Block)
    self.type = typeIndex or love.math.random(1, #config.blockTypes)
    self.rotation = 1
    self.shape = config.blockTypes[self.type][self.rotation]
    self.pos = {
        x = 4,
        y = 0
    }
    return self
end

function Block:getShape(rotation)
    rotation = rotation or self.rotation
    return config.blockTypes[self.type][rotation]
end

function Block:rotate()
    local n = #config.blockTypes[self.type]
    self.rotation = (self.rotation % n) + 1
    self.shape = self:getShape()
end

function Block:setRotation(rotation)
    self.rotation = rotation
    self.shape = self:getShape()
end

return Block
