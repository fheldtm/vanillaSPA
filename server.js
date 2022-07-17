import http from 'http';
import path from 'path';

import { router } from './router/index.js';
import { addStatic } from './middleware/index.js';

// define __dirname
global.__dirname = path.resolve();

// define link
global.Link = (link) => path.join(__dirname, 'src', link);
global.Page = (link) => path.join(__dirname, 'src', 'pages', link);

// static directory setting
addStatic('/assets');
addStatic('/components');
addStatic('/pages');
addStatic('/store');
addStatic('/main.js');

// create server
const server = http.createServer(router);

server.listen(5555);
