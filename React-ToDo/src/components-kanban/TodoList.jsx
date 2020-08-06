import React, { useState } from 'react';


let TodoList = ({todoType}) => {
    return (
        <div>
            <a>{todoType}</a>
        </div>
    );
}

export default TodoList;