import React, { Component, useState } from 'react';
import './App.css';

/*
TODO
-------------------------------------------------------------------------------
* error handling with fetch()
- timeout for backend api call 
- throttling response from backend
* login 
* database: rdb to dynamodb 
* build webapp
* migrate to jsx

DONE
-------------------------------------------------------------------------------

*/



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
      <div>{todo.todoId}</div>
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

function ReadTodo({readTodo, todos}) {
  return (
    <div>
      <button onClick={() => readTodo(todos)}>Read Todos</button>
    </div>
  );
}

interface TestTodo {
  todoId: Number;
  text: string;
  isCompleted: Boolean
}

class App extends Component {
  

/*
const [todos, setTodos]  = useState([
      {
        todoId: 0,
        text: "migrate backend DB from RDS to DynamoDB",
        isCompleted: false
      },
      {
        todoId: 1,
        text: "create a new project",
        isCompleted: false
      }
    ]);
  
*/  

  addTodo = text => {    
    const timer = setTimeout(() => {
      const newTodos = [...todos, { text }];
      setTodos(newTodos);
    }, 1000);
    return () => clearTimeout(timer);
    
  };

  completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  removeTodo = index => {
    const newTodos = [...todos];

    const postParams = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: todos[index] })
    };

    fetch('http://localhost:3001/todo-history', postParams)
      .then(response => response.json());

    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  write = todos => {
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

  readTodos = todos => {
      const getParams = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
  
      fetch('http://localhost:3001/todo-history', getParams)
        .then(response => response.json())
        .then(response => {
          const newTodos = response.map((todo) => {
            return { 
              text: todo.todo_text, 
              isCompleted: todo.complete | 0
            };
          });
  
          console.log(newTodos);
          setTodos(newTodos);
        });
    };

  render() {
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
          <ReadTodo 
            readTodo={readTodos} 
            todos={todos}
          />
        </div>
      </div>
    );
  }
}

export default App;
