import { setClass } from '../library/custom.js';

export const styles = {
  header: {
    color: '#f00',
    backgroundColor: '#000'
  },
  logo: {
    color: '#fff',
    backgroundColor: '#f00'
  }
}

const $class = setClass(styles)

export const Header = /* html */`
<header class="${$class.header}">
  <h1 class="${$class.logo}"><a link="/"></a></h1>
</header>
`;