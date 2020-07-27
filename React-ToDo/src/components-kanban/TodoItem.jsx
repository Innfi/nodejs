import React, { useState } from 'react';


let TodoItem = ({todo, removeTodo}) => {
    //const [todo, setTodo] = useState(todo);

    return (
        <div className='upper-class'>
            {todo.text}
            <div className='Author'>
                {todo.author}
            </div>
            <button onClick={ () => removeTodo(todo.todoId) }>Remove Todo</button>
        </div>
    );
}

export default TodoItem;