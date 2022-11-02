const fs = require('fs');
const { readFile, writeFile, promises: fsPromises } = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getFiles(dir, depth) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res, depth + 1) : { path: res, depth };
    }),
  );
  return files.reduce((a, f) => a.concat(f), []);
}
(async () => {
  const files = await getFiles('./comms-uikit-react/src', 0);
  for (const file of files) {
    readFile(file.path, 'utf-8', function (err, contents) {
      let replacement = './common';
      if (file.depth > 0) {
        replacement = `${'../'.repeat(file.depth)}common`;
      }
      const replaced = contents.replace(/@dolbyio\/comms-uikit-common/g, replacement);

      writeFile(file.path, replaced, 'utf-8', () => {});
    });
  }

  fs.readFile('./comms-uikit-react/package.json', 'utf8', function (err, data) {
    let lines = data.split('\n');
    lines = lines.filter((line) => !line.includes('@dolbyio/comms-uikit-common'));
    lines = lines.join('\n');
    fs.writeFile('./comms-uikit-react/package.json', lines, () => {});
  });
})();
