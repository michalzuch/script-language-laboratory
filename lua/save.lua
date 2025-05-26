local json = require("dkjson")

local Save = {}

local SAVE_FILENAME = "tetris_save.json"

function Save.save(data)
    local str = json.encode(data, {
        indent = true
    })
    love.filesystem.write(SAVE_FILENAME, str)
end

function Save.load()
    if love.filesystem.getInfo(SAVE_FILENAME) then
        local str = love.filesystem.read(SAVE_FILENAME)
        return json.decode(str)
    end
    return nil
end

return Save
