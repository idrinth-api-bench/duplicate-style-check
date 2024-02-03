import {existsSync, readdirSync} from 'node:fs';
import checkFile from './handle-file.js';
import {readFileSync} from "fs";

export default (cwd: string): boolean => {
  let success = true;
  if (existsSync(cwd + '/.idrinth-duplicate-style-check.json')) {
    const data = JSON.parse(readFileSync(cwd + '/.idrinth-duplicate-style-check.json', 'utf8'));
    if (typeof data === 'object' && typeof data.entrypoints === 'object' && Array.isArray(data.entrypoints)) {
      for(const file of data.entrypoints) {
        if (!existsSync(cwd + '/' + file)) {
          success = false;
          console.error(`Css file ${file} doesn't exist.`);
        } else {
          success = checkFile(cwd + '/' + file) && success;
        }
      }
      return success;
    }
  }
  console.warn('No configuration found, trying every css file outside node_modules as entry point.');
  for (const file of readdirSync(cwd, {recursive: true, encoding: 'utf8'})) {
    if (file.endsWith('.css') && !file.includes('node_modules')) {
      success = checkFile(cwd + '/' + file) && success;
    }
  }
  return success;
}
