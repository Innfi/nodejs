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

/*
class NewTodoForm extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
      componentDidMount() {
          console.log("NewTodoForm mounted");
      }
  
    handleChange(event) {
      console.log("handleChange: " + event.target.value);
      this.setState({value: event.target.value});
    }
  
      handleSubmit(event) {
      event.preventDefault();
      console.log("value: " + this.state.value);
      this.props.addTodo(this.state.value);
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
  
*/

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
      ]
    }
  }

  addTodo = (newItem) => {
    this.setState({
      todos: [...this.todos, newItem]
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
      </div>
    );
  }
}

export default App;
