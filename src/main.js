import { store } from '/store/index.js';
import { TodoList } from '/components/Todolist.js';
import { Navigation } from './components/Navigation.js'

let __flag = {
  init: false,
};

// DOM을 직접 다루는 코드입니다.
// const render = () => {
//   const $app = document.querySelector('#app');
//   $app.innerHTML = TodoList();
//   $app.querySelectorAll('li').forEach((el) => {
//     el.addEventListener('click', (e) => {
//       const { id } = e.target.parentElement.dataset;
//       store.toggleActivation(
//         store.state.todoItems.findIndex((v) => v.id === Number(id))
//       );
//     });
//   });

//   __flag.init = true;
// };
const setLink = () => {
  const pathname = window.location.pathname;
  const links = document.querySelectorAll('a[link]');
  links.forEach(link => {
    if (link.getAttribute('link') === pathname) {
      link.style.textDecoration = 'underline';
    } else {
      link.style.textDecoration = '';
    }

    link.addEventListener('click', () => {
      const l = link.getAttribute('link');
      window.history.pushState({}, null, l);
      render();
    })
  })
}

const render = () => {
  const pathname = window.location.pathname;
  const $app = document.querySelector('#app');

  $app.innerHTML = Navigation;
  $app.innerHTML += pathname

  setLink();
}

render();
