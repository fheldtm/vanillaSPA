import fs from 'fs';
import path from 'path';

// class random 값으로 작성하기 위해 랜덤 값 생성기 추가
export const getRandom = (length = 10) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// camel case로 작성된 css를 실제 css로 수정
export const style = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

let __css = ''
let __classes = {};
export const setClass = (classes) => {
  __classes = {};
  const result = Object.keys(classes)
    .map(className => {
      const styles = classes[className];
      const parseClassName = `${className}-vnl-${getRandom()}`;
      __classes[className] = parseClassName;
      const s = Object.keys(styles)
        .map((styleName) => `${style(styleName)}:${styles[styleName]};`).join('')
      return `${parseClassName}{${s}}`
    }).join('');
  __css += result;

  // css 파일 생성
  writeCssFile();

  // class 값 return
  return JSON.parse(JSON.stringify(__classes));
};

/**
 * @description 새로운 css 파일 생성
 * @Todo 캐시 처리 어떻게 할지 생각해보기
 */
const writeCssFile = () => {
  const cssFileName = `vnl${getRandom()}.css`
  const __dirname = path.resolve();
  fs.writeFile(path.join(__dirname, 'src', 'assets', 'css', cssFileName), __css, (err) => {
    if (err) {
      console.error(err);
    }
  })
}
