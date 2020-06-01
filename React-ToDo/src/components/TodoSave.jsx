import React, { Component } from 'react';


class TodoSave extends Component {
    render() {
        const { todos, saveTodos } = this.props;

        return (
            <div className="todo">
                <button onClick={() => saveTodos(todos)}>Save</button>
            </div>
        );
    }
}

export default TodoSave;