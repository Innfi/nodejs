import React from 'react';


let TodoItem = ({todo, index, removeTodo}) => {
    return (
        <div className='upper-class'>
            {todo.text}
            <div className='Author'>
                {todo.author}
            </div>
            <button onClick={ () => removeTodo(index) }>Remove Todo</button>
        </div>
    );
}

export default TodoItem;