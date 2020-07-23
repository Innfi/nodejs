import React, { useState } from 'react';


let TodoItem = (props) => {
    const [todo, setTodo] = useState(props);

    return (
        <div>
            {todo.text}
            <div className='Author'>
                {todo.author}
            </div>
        </div>
    );
}

export default TodoItem;