local XML = {}

local function ReadFile(path)
	if package.cpath:match("%.dll") then
		path = path:gsub("/", "\\")
	else
		path = path:gsub("\\", "/")
	end
	return io.open(path, "r"):read("*all")
end

function XML.GetLuaFiles(path)
	local result = {}
	for filePath in gmatch(ReadFile(path), "<Script file=\"([^\"]+)\"[ ]*/>") do
		tinsert(result, filePath)
	end
	return result
end

do
	return XML
end
