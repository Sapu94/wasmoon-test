import { readFileSync } from 'fs';
import { LuaFactory } from 'wasmoon';

const main = async () => {
  // Create the factory and engine
  const factory = new LuaFactory();
  const lua = await factory.createEngine({enableProxy: false});

  // Mount the files which lua code calls require() on
  const REQUIRED_MODULES = [
    'TestLuaCode/Lib/XML.lua',
    'TestLuaCode/Lib/IncludeA.lua',
    'TestLuaCode/Lib/Lib/IncludeB.lua',
  ];
  for (const path of REQUIRED_MODULES) {
    await factory.mountFile(path, readFileSync(path));
  }

  const origRequire = lua.global.get('require');
  lua.global.set('require', (path: string) => origRequire(path));
  await factory.mountFile('test.lua', readFileSync('test.lua'));
  const testObj = await lua.doFile('test.lua');
  testObj.Run('TEST');
};

main();
