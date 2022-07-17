import { store } from './store/index.js';
import { TodoList } from './components/todolist.js';

// DOM을 직접 다루는 코드입니다.
const render = () => {
  const $app = document.querySelector('#app');
  $app.innerHTML = TodoList();
  $app.querySelectorAll('li').forEach((el) => {
    el.addEventListener('click', () => {
      const { id } = e.target;
      store.state.toggleActivation(
        store.state.todoItems.findIndex((v) => v.id === Number(id))
      );
    });
  });
};

render();
