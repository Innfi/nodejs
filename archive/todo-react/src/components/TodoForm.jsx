import React, { Component } from 'react';


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
        <form onSubmit={this.handleSubmit} className="todo">
          <label>Add new todo!</label>&nbsp;
          <input type="text" className="input" value={this.state.value} aria-label="todo-input" 
                     onChange={this.handleChange} />
          <button type="submit">add todo</button>
        </form>
      );
    }
  }
  
  export default TodoForm;