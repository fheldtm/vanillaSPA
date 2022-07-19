import path from 'path';

/**
 * @description MimeType 확인
 */
export const getMimeType = (type) => {
  let mimetype = '';
  switch (type) {
    case '':
      mimetype = 'text/html';
      break;
    case '.js':
      mimetype = 'text/javascript';
      break;
    case '.css':
      mimetype = 'text/css';
      break;
    case '.json':
      mimetype = 'application/json';
      break;
  }

  return mimetype;
};

/**
 * @description add static directory or file
 */
const statics = [];
export const addStatic = (dir) => statics.push(dir);
export const isStatic = (url) => {
  const files = statics.filter(
    (s) => path.extname(path.join(__dirname, 'src', s)) !== ''
  );
  const isStaticFile = files.some((file) => file === url);
  if (isStaticFile) {
    return true;
  }

  const dir = path
    .dirname(url)
    .split('/')
    .filter((d) => d !== '');

  return statics.some((staticDir) => {
    return staticDir
      .split('/')
      .filter((p) => p !== '')
      .every((p, i) => {
        return p === dir[i];
      });
  });
};
