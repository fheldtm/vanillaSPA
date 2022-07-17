import fs from 'fs';
import path from 'path';

import { getMimeType, isStatic } from '../middleware/index.js';

const _options = {
  req: null,
  res: null,
  success: false,
};

const getPage = (link) => path.join(__dirname, 'src', 'pages', link);

const GET = (url, cb) => {
  const { req, res } = _options;
  if (req.method === 'GET') {
    if (req.url === url) {
      if (!cb || typeof cb !== 'function') {
        return;
      }

      cb(req, res);

      _options.success = true;
    }
  }
};

const REDIRECT = (url) => {
  const { req, res } = _options;
  const host = req.headers.host;

  _options.success = true;
  res.statusCode = 302;
  res.setHeader('Location', `http://${host}${url}`);
  res.end();
};

export const router = (req, res) => {
  _options.req = req;
  _options.res = res;
  _options.success = false;

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

  // html 문서 설정
  GET('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    const read = fs.createReadStream(getPage('index.html'));
    read.pipe(res);
  });

  // error page routing
  GET('/notfound', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    const read = fs.createReadStream(getPage('404.html'));
    read.pipe(res);
  });

  // not found any router
  if (!_options.success) {
    REDIRECT('/notfound');
  }
};
