import React, { useState, Component } from 'react';
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

class NewTodo extends Component {
  componentDidMount() {
    console.log("NewTodo mounted");

    const getParams = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
  
    const userId = "test1";
    const url = "http://localhost:3001/todo-backend/".concat(userId);

    fetch(url, getParams)
    .then(response => response.json())
    .then(response => {
      console.log(response);
    });
  }

  render() {
    const todo = this.props.todo;
    const index = this.props.index;
    const completeTodo = this.props.completeTodo;
    const removeTodo = this.props.removeTodo;

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

  const addTodo = text => {    
    const timer = setTimeout(() => {
      const newTodos = [...todos, { text }];
      setTodos(newTodos);
    }, 1000);
    return () => clearTimeout(timer);
    
  };
  
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  
  const removeTodo = index => {
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
          <NewTodo 
            key={index} 
            index={index} 
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo} 
          />
        ))}
        <NewTodoForm addTodo={addTodo} />
        <WriteTodo 
          writeTodo={write} 
          todos={todos}
        />
      </div>
    </div>
  );
}

export default App;
