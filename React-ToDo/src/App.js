import React, { Component } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoSave from './components/TodoSave';

/*
TODO
-------------------------------------------------------------------------------
* error handling with fetch()
- timeout for backend api call 
- throttling response from backend
* login 
* build webapp

DONE
-------------------------------------------------------------------------------
* database: rdb to dynamodb 

*/

class BackendHandler {
  // constructor(url) {
  //     this.backendUrl = url;
  // }

  loadTodos = (callback) => {
    const params = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    fetch('http://localhost:3001/todo-backend/test1', params)
    .then(response => response.json())
    .then(data => {
        callback(data);
    });
  }

  saveTodos = (todos, callback) => {
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todos)
    };

    fetch('http://localhost:3001/todo-backend/test1', params)
    .then(response => response.json())
    .then(data => {
      callback(data);
    });
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
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
      ],
      todoIndex: 2,
      backendHandler: new BackendHandler()
    }
  }

  componentDidMount() {
    this.state.backendHandler.loadTodos((data) => {
      const loadedTodos = data.map(item => {
        const todo = {
          todoId: Number(item.TodoId),
          text: item.TodoText,
          isCompleted: item.Completed === 0
        };

        return todo;
      });

      this.setState({
        todos: [...this.state.todos, ...loadedTodos]
      });
    });
  }

  addTodo = (newItem) => {
    const newTodo = {
      todoId: this.state.todoIndex,
      text: newItem, 
      isCompleted: false,
    };

    this.setState({
      todos: [...this.state.todos, newTodo],
      todoIndex: this.state.todoIndex+1,
    });
  };

  completeTodo = (index) => {
    const newTodos = [...this.state.todos];
    newTodos[index].isCompleted = true;

    this.setState({
      todos: newTodos
    });
  };

  removeTodo = (index) => {
    this.setState({
      todos: this.state.todos.splice(index, 1)
    });
  };

  render() {
    return (
      <div className="app">
        <div className="todo-list">
          <TodoList data={this.state.todos} 
                    completeTodo={this.completeTodo} 
                    removeTodo={this.removeTodo}
          />
          <TodoForm addTodo={this.addTodo} />
          <TodoSave todos={this.state.todos} 
            saveTodos={this.state.backendHandler.saveTodos} />
        </div>
      </div>
    );
  }
}

export default App;
