const path = require("path");
const os = require("os");
const fs = require("fs");

const nativeReadFile = name =>
  new Promise((resolve, reject) => {
    fs.readFile(name, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });

/**
 * A utility to search for json config files. Searches up the current path
 * until it finds the named file. If files is not found in the hierarchy of the
 * current working directory, it will search in the uses home directory.
 * @param {string} name The name of the config file.
 */
async function findConfig(name, _readFile, _cwd) {
  const readFile = _readFile || nativeReadFile;
  const home = os.homedir();
  let current = _cwd || process.cwd();
  let data;
  while (!data && current.length > 1) {
    try {
      data = await readFile(path.join(current, name));
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
      current = path.dirname(current);
    }
  }
  if (!data) {
    try {
      data = await readFile(path.join(home, name));
    } catch (e) {}
  }
  if (!data) {
    throw new Error(`Config file "${name}" not found.`);
  }
  return JSON.parse(data.toString());
}

module.exports = {
  findConfig
};
