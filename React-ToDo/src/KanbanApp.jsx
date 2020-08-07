import React, { useState } from 'react';
import TodoList from './components-kanban/TodoList';


let KanbanApp = () => {
    const [todos, setTodos] = useState([
        {
            text: 'implement kanban',
            author: 'innfi',
            todoType:'Todo'
        },
        {
            text: 'apply materialUI',
            author: 'ennfi',
            todoType: 'On-Progress'
        },
        {
            text: 'write a terraform module',
            author: 'innfi',
            todoType: 'Done'
        }
    ]);

    const addTodo = (todo) => {
        const newTodos = [...todos, todo];
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const props = {
        todos: todos,
        addTodo: addTodo,
        removeTodo: removeTodo
    };

    return (
        <div className="app">
            <div className='kanban-list'>
                <TodoList props={props} todoType={'Todo'}  />
                <TodoList props={props} todoType={'On-Progress'} />
                <TodoList props={props} todoType={'Done'}/>
            </div>
        </div>
    );
}

export default KanbanApp;