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

/**
 * class object 를 실제 css로 변경
 * 그런데 랜덤값을 곁들인
 */
let __css = ''
let __classes = {};
export const addClass = (classes) => {
  __classes = {};

  const result = Object
		.keys(classes)
    .map(className => {
      const styles = classes[className];
      const parseClassName = `c-vnl-${getRandom()}`;
      __classes[className] = parseClassName;

      const s = Object
				.keys(styles)
        .map((styleName) => `${style(styleName)}:${styles[styleName]};`)
				.join('')

      return `.${parseClassName}{${s}}`
    })
		.join('');

  __css += result;

  // class 복제 값 return
  return JSON.parse(JSON.stringify(__classes));
};

/**
 * @description 기존 css 파일 전부 제거
 */
export const removeAllCssFiles = () => {
  const __dirname = path.resolve();
	const cssDirPath = path.join(__dirname, 'src', 'assets', 'css');
	const files = getAllCssFiles()
	files.map((file) => {
		fs.unlinkSync(path.join(cssDirPath, file))
	})
}

// css 폴더의 파일 전부 조회
export const getAllCssFiles = () => {
  const __dirname = path.resolve();
	const cssDirPath = path.join(__dirname, 'src', 'assets', 'css');
	try {
		const files = fs.readdirSync(path.join(cssDirPath))
		return files;
	} catch (err) {
		console.error(err);
		return []
	}
}

/**
 * @description 새로운 css 파일 생성
 * 최초 1회 빌드하여 캐시값 유지
 */
export const buildCssFile = () => {
	removeAllCssFiles();

  const cssFileName = `vnl-${getRandom()}.css`
  const __dirname = path.resolve();
	const cssDirPath = path.join(__dirname, 'src', 'assets', 'css');
	try {
		fs.mkdirSync(cssDirPath, { recursive: true })
		try {
			fs.writeFileSync(path.join(cssDirPath, cssFileName), __css)
		} catch (err) {
			console.error(err);
		}
	} catch (error) {
		console.error(error);
	}
}