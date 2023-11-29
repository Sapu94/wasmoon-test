import { readFile } from 'fs/promises';
import { LuaFactory } from 'wasmoon';

const main = async () => {
  // Create the factory and engine
  const factory = new LuaFactory();
  const lua = await factory.createEngine({enableProxy: false});

  // Mount the files which lua code calls require() on
  await factory.mountFile('TestLuaCode/Lib/XML.lua', await readFile('LuaCode/XML.lua'));
  await factory.mountFile('TestLuaCode/Lib/EmptyModule.lua', Buffer.from(""));
  await factory.mountFile('TestLuaCode/Lib/Lib/IncludeB.lua', await readFile('LuaCode/IncludeB.lua'));

  const origRequire = lua.global.get('require');
  lua.global.set('require', (path: string) => origRequire(path));
  await factory.mountFile('test.lua', await readFile('test.lua'));
  const testObj = await lua.doFile('test.lua');
  testObj.Run('TEST');
};

main();
