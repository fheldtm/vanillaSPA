import { addClass } from '../library/custom.js';

export const styles = {
  header: { color: '#f00', backgroundColor: '#000' },
  logo: { color: '#fff', backgroundColor: '#f00' },
	gnb: {}
}

const _class = addClass(styles);

export const Header = /* html */`
	<header class="${_class.header}">
		<h1 class="${_class.logo}">
			<a link="/"></a>
		</h1>
		
		<div class="${_class.gnb}"></div>
	</header>
`