import React, { Component } from 'react';


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
  
  export default TodoItem;