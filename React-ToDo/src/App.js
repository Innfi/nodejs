import React, { Component } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
//import TodoSave from './components/TodoSave';

/*
TODO
-------------------------------------------------------------------------------
* refactoring BackendHandler: constructor / method parameters
* fix todoId
* error handling with fetch()
- timeout for backend api call 
- throttling response from backend
* login 
* build webapp

DONE
-------------------------------------------------------------------------------
* database: rdb to dynamodb 
* add item to db within App.addTodo 
* delete item from db within App.removeTodo
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

  addTodo = (newTodo, callback) => {
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( {todo: newTodo })
    };

    fetch('http://localhost:3001/todo-backend/test1', params)
    .then(response => response.json())
    .then(callback());
  }

	removeTodo = (targetTodoId, callback) => {
		const params = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { todoId: targetTodoId } )
		};

		fetch('http://localhost:3001/todo-backend/test1', params)
		.then(response => response.json())
		.then(callback());
	}
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todoIndex: 20,
      backendHandler: new BackendHandler()
    }
  }

  componentDidMount() {
    this.state.backendHandler.loadTodos((data) => {
      const loadedTodos = data.map(item => {
        const todo = {
          todoId: Number(item.TodoId),
          text: item.TodoText,
          isCompleted: item.Completed === 1
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

    this.state.backendHandler.addTodo(newTodo, () => {
      console.log('after saveTodo()');
      this.setState({
        todos: [...this.state.todos, newTodo],
        todoIndex: this.state.todoIndex+1,
      });
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
    const todoId = this.state.todos[index].todoId;
    this.state.backendHandler.removeTodo(todoId, () => {
      this.state.todos.splice(index, 1);

      this.setState({
        todos: this.state.todos
      });
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
        </div>
      </div>
    );
  }
}

export default App;
