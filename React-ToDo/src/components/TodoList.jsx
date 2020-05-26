import React, { Component } from 'react';
import TodoItem from './TodoItem';


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
  
  export default TodoList;