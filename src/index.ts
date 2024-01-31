import {readdirSync} from 'node:fs';
import checkFile from './handle-file.js';

export default (cwd: string): boolean => {
  let success = false;
  for (const file of readdirSync(cwd, {recursive: true, encoding: 'utf8'})) {
    if (file.endsWith('.css') && !file.includes('node_modules') && !file.includes('coverage') && !file.includes('dist')) {
      success = checkFile(cwd + '/' + file) || success;
    }
  }
  return success;
}
