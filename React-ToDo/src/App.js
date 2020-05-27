import React, { Component } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

/*
TODO
-------------------------------------------------------------------------------
* error handling with fetch()
- timeout for backend api call 
- throttling response from backend
* login 
* database: rdb to dynamodb 
* build webapp

DONE
-------------------------------------------------------------------------------

*/

class BackendHandler {
  // constructor(url) {
  //     this.backendUrl = url;
  // }

  test_get = () => {
      const params = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      };

      fetch('http://localhost:3001/todo-backend/test1', params)
          .then(response => response.json())
          .then(data => {
              console.log(data);
          });
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    const handler = new BackendHandler();
    handler.test_get();

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
      todoIndex: 2
    }
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
        </div>
        <div>
          <TodoForm addTodo={this.addTodo} />
        </div>
      </div>
    );
  }
}

export default App;
