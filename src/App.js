import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
const { v4: uuidv4 } = require('uuid');

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  //useState returns an array
  //can destructure an array and then set it to useState
  //todoArr is array, and func setTodos that allows to update todoArr
  const [todoArr, setTodos] = useState([]);

  const todoNameRef = useRef(); //now we have access to input element

  //when passed with an empty array of dependencies, this useEffect will only be called once when the component
  //loads
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, [])

  //this is run anytime anything in the provided array changes
  //in this case anytime the todoArr changes we update local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoArr));
  }, [todoArr])
  
  const toggleTodo = (id) => {
    const newTodos = [...todoArr];
    const todo = newTodos.find(t => t.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  const handleAddTodo = (e) => {
    //todoNameRef.current refers to whatever element we are currently referencing
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos( prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }

  const handleClearTodoArr = () => {
    const newTodos = todoArr.filter(t => !t.complete);
    setTodos(newTodos);
  }

  /* 
  <></> is a fragment.
  1. Tiny bit faster and has less mem usage (no need to create an extra DOM node). Only real benefit on a very large and/or deep trees, but app performance often suffers from death by a thousand cuts. This is one cut less.
  2. Some CSS mechanisms like Flexbox and CSS Grid have a special parent-child relationship, and adding divs in the middle makes it hard to keep the desired layout while extracting logical components.
  3. The DOM inspector is less cluttered.
  4. Less overall dom markup (increased render performance and less memory overhead)
  */
  //useRef hook allows to reference elements inside html
  return (
    <>
      <TodoList todoList={todoArr} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodoArr}>Clear Complete Todos</button>
      <div>
        {todoArr.filter(t => !t.complete).length} left to do
      </div>
    </>
  );

  
}

export default App;