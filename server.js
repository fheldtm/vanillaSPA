import http from 'http';
import path from 'path';
import fs from 'fs';

// define __dirname
global.__dirname = path.resolve();

// define link
global.Link = (link) => path.join(__dirname, 'src', link);

import { router } from './router/index.js';
import { addStatic } from './middleware/index.js';

// static directory setting
addStatic('/assets');
addStatic('/components');
addStatic('/pages');
addStatic('/store');
addStatic('/main.js');

const directorys = fs.readdirSync(path.join(__dirname, 'src'));
const files = fs.readFileSync(path.join(__dirname, 'src'));
console.log(directorys)

// create server
const server = http.createServer(router);

server.listen(5555);
