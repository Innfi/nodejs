import React, { useState } from 'react';
import './App.css';


function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="input" 
        value={value} 
        onChange= {e => setValue(e.target.value)}
      />
    </form>
  );
}

function Todo({todo, index, completeTodo, removeTodo}) {
  return (
    <div 
      className="todo" 
      style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}
      >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index) }>Complete</button>
        <button onClick={() => removeTodo(index) }>x</button>
      </div>
    </div>
  );
}

function WriteTodo({ writeTodo, todos }) {
  return (
    <div>
      <button onClick={() => writeTodo(todos) }>Write</button>
    </div>      
  );
}

function App() {
  const [todos, setTodos]  = useState([
    { 
      text: "Learn about React", 
      isCompleted: false 
    },
    { text: "Work",
      isCompleted: false  
    },
    { 
      text: "Build an webapp for CodeCommit" ,
      isCompleted: false 
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
 
  const write = todos => {
    const newTodos = [...todos];

    const postParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todos: newTodos })
    };
    fetch('http://localhost:3001/todo-history', postParams)
      .then(response => response.json());

    setTodos(newTodos);
  };


  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo 
            key={index} 
            index={index} 
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
        <WriteTodo 
          writeTodo={write} 
          todos={todos}
        />
      </div>
    </div>
  );
}

export default App;
