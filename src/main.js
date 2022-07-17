import { store } from '/store/index.js';
import { TodoList } from '/components/todolist.js';

let __flag = {
  init: false,
};

// DOM을 직접 다루는 코드입니다.
const render = () => {
  const $app = document.querySelector('#app');
  $app.innerHTML = TodoList();
  $app.querySelectorAll('li').forEach((el) => {
    el.addEventListener('click', (e) => {
      const { id } = e.target.parentElement.dataset;
      store.toggleActivation(
        store.state.todoItems.findIndex((v) => v.id === Number(id))
      );
    });
  });

  __flag.init = true;
};

render();
