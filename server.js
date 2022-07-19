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

// create server
const server = http.createServer(router);

const port = 5555;
server.listen(port);
console.log(`http://localhost:${port}`);
