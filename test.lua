local Test = {}
local XML = require("TestLuaCode.Lib.XML")

function Test.Run(str)
	require("TestLuaCode.Lib.IncludeA")
	require("TestLuaCode.Lib.Lib.IncludeB")

	GLOBAL1 = 1
	GLOBAL2 = 2
	GLOBAL3 = 3
end

return Test
