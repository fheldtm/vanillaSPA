import { Header } from '../components/Header.js';

export const render = (RootComponent) => /* html */ `
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>
  <body>
    ${Header}
    <div id="app">${RootComponent}</div>

    <script src="main.js" type="module"></script>
  </body>
</html>
`;
