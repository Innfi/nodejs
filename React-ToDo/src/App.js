import React, { Component } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import BackendHandler from './BackendHandler';

/*
TODO
-------------------------------------------------------------------------------
* rewrite code with unit tests
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
* refactoring BackendHandler: constructor / method parameters
* fix todoId

*/

const backendUrl = 'http://localhost:3001/todo-backend/test1';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todoIndex: 0,
      backendHandler: new BackendHandler(backendUrl)
    }
  }

  componentDidMount() {
    this.loadTodo();
  }

  loadTodo = () => {
    this.state.backendHandler.loadTodos((data) => {
      const loadedTodos = data.map(item => {
        const todo = {
          todoId: Number(item.TodoId),
          text: item.TodoText,
          isCompleted: item.Completed === 1
        };

        return todo;
      });

      let newTodoIndex = 0;
      if(loadedTodos.length > 0) {
        newTodoIndex = loadedTodos.slice(-1)[0].todoId;
      }
   
      this.setState({
        todos: [...loadedTodos],
        todoIndex: newTodoIndex
      });
    });
  };

  addTodo = (newItem) => {
    const newTodo = {
      todoId: this.state.todoIndex+1,
      text: newItem, 
      isCompleted: false,
    };

    this.state.backendHandler.addTodo(newTodo, () => {
      this.setState({
        todos: [...this.state.todos, newTodo],
        todoIndex: this.state.todoIndex+1,
      });
    });    
  };

  completeTodo = (index) => {
    const newTodos = [...this.state.todos];
    newTodos[index].isCompleted = true;

    this.state.backendHandler.updateTodo(newTodos[index], () => {
      this.setState({
        todos: newTodos
      });
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
