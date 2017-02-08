import React from 'react';
import { List, Map } from 'immutable';

const dummyTodos = [
  { id: 0, isDone: true,  text: 'make components' },
  { id: 1, isDone: false, text: 'design actions' },
  { id: 2, isDone: false, text: 'implement reducer' },
  { id: 3, isDone: false, text: 'connect components' }
];

export function Todo(props) {
  const { todo } = props;
  if (todo.isDone) {
    return (
      <strike>{todo.text}</strike>
    );
  } else {
    return (
      <span>{todo.text}</span>
    );
  }
}

export function TodoList(props) {
  const { todos, toggleTodo, addTodo } = props;

  const onSubmit = (event) => {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which == 13);
    const isLongEnough = text.length > 0;

    if (isEnterKey && isLongEnough) {
      input.value = '';
      addTodo(text);
    }
  };

  const toggleClick = id => event => toggleTodo(id);

  return (
    <div className='todo'>
      <input type='text'
             className='todo__entry'
             placeholder='Add todo'
             onKeyDown={onSubmit} />
      <ul className='todo__list'>
        {todos.map((t, i) => (
          <li key={i}
              className='todo__item'
              onClick={toggleClick(t.get('id'))}
          >
            <Todo todo={t.toJS()} />
          </li>
        ))}
      </ul>
    </div>
  );
}
