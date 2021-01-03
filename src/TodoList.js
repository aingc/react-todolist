import React from 'react'
import Todo from './Todo'

export default function TodoList({ todoList, toggleTodo }) {
  return (
    todoList.map(todoElement => {
      //setting a key here makes sure that when a todo state is updated, only the specific one will re render,
      //not all of them
      return <Todo key={todoElement.id} toggleTodo={toggleTodo} todo={todoElement} />
    })
  );
}
