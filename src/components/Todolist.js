import { store } from '../store/index.js';

export const TodoList = () => /*html*/ `
  <ul>
    ${store.state.todoItems.map(TodoItem).join('')}
  </ul>
`;

export const TodoItem = ({ id, content, activation }) => /*html*/ `
  <li data-id="${id}">
    <input type="checkbox" ${activation ? 'checked' : ''} />
    <span ${activation ? 'style="text-decoration: line-throught;"' : ''}>
      ${content}
    </span>
  </li>
`;
