import React from 'react';
import TodoItem from './TodoItem';


let TodoList = ({todoType, props}) => {
    const filteredTodos = props.todos
        .filter(todo => todo.todoType === todoType)
        .map((item, index) => (
            <TodoItem todo={item} index={index} 
                removeTodo={props.removeTodo} />
        ));

    return (
        <div>
            <div>
                <p>{todoType}</p>
            </div>
            <div>
                {filteredTodos}
            </div>
        </div>
    );
}

export default TodoList;