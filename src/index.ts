import {readdirSync} from 'node:fs';
import buildMap from './build-map.js';

export default (cwd: string) => {
    for (const file of readdirSync(cwd, {recursive: true, encoding: 'utf8'})) {
        if (file.endsWith('.css') && !file.includes('node_modules') && !file.includes('coverage') && !file.includes('dist')) {
            buildMap(cwd + '/' + file);
        }
    }
}
