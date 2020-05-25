import React, { Component } from 'react';
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

DONE
-------------------------------------------------------------------------------

*/


class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: ''};
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTodo(this.state.value);

    this.resetInput();
  };

  resetInput = () => {
    this.setState({
      value: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" className="input" value={this.state.value} 
                   onChange={this.handleChange} />
      </form>
    );
  }
}

class TodoItem extends Component {
  render() {
    const { index, todo, completeTodo, removeTodo} = this.props;
    
    return (
      <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}>
        <div>{todo.todoId}</div>
        {todo.text}
        <div>
            <button onClick={() => completeTodo(index) }>Complete</button>
            <button onClick={() => removeTodo(index) }>x</button>
        </div>
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    const { data, completeTodo, removeTodo} = this.props;
    const todoList = data.map(
      (item, index) => (
        <TodoItem 
          index={index} todo={item} 
          completeTodo={completeTodo} removeTodo={removeTodo}
        />
      )
    );

    return (
      <div>
        {todoList}
      </div>
    );
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
