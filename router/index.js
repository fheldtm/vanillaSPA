import fs from 'fs';
import path from 'path';

import { getMimeType, isStatic } from '../middleware/index.js';
import { render } from '../src/renderer/index.js';
import { notFound } from '../src/renderer/notFound.js';
import { TodoList } from '../src/components/todolist.js';

const __options = {
  req: null,
  res: null,
  success: false,
};

const getViewPage = (link) => path.join(__dirname, 'src', 'views', link);

const GET = (url, cb) => {
  const { req, res } = __options;
  if (req.method === 'GET') {
    if (req.url === url) {
      if (!cb || typeof cb !== 'function') {
        return;
      }

      cb(req, res);

      __options.success = true;
    }
  }
};

const REDIRECT = (url) => {
  const { req, res } = __options;
  const host = req.headers.host;

  __options.success = true;
  res.statusCode = 302;
  res.setHeader('Location', `http://${host}${url}`);
  res.end();
};

export const router = (req, res) => {
  __options.req = req;
  __options.res = res;
  __options.success = false;

  const url = req.url;

  const type = path.extname(url);
  const mimetype = getMimeType(type);

  // static 파일 설정
  // text/html 형식 외에 파일들 설정
  if (mimetype !== 'text/html') {
    if (!isStatic(url)) {
      res.statusCode = 404;
      res.end();
      return;
    } else {
      res.setHeader('Content-Type', mimetype);
      const read = fs.createReadStream(path.join(__dirname, 'src', url));
      read.pipe(res);
      return;
    }
  }

  res.setHeader('Content-Type', mimetype);

  // html 문서 설정
  GET('/', (req, res) => {
    res.statusCode = 200;
    res.end(render(TodoList()), 'utf-8');
  });

  // error page routing
  GET('/notfound', (req, res) => {
    res.statusCode = 200;
    res.end(notFound, 'utf-8');
  });

  // not found any router
  if (!__options.success) {
    REDIRECT('/notfound');
  }
};
