import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';


describe('TodoItem(kanban) Component', () => {
    const mockTodo = {
        todoId: 1,
        text: 'implement kanban',
        todoStatus: 0,
        author: 'Innfi'
    };

    const props = {
        index: 1,
        todo: mockTodo
    };

    it('TodoItem has text', () => {
        const { getByText } = render(<TodoItem todo={mockTodo} />);

        const todo = getByText(mockTodo.text);
        expect(todo).toBeTruthy();
    }); 

    it('TodoItem has author', () => {
        const dom = render(<TodoItem todo={mockTodo} />);

        const anotherTodo = dom.container.firstElementChild;

        const todo = dom.getByText(mockTodo.author);
        expect(todo).toBeInTheDocument();
        expect(todo).toHaveClass('Author');
    });

    it('Calls removeTodo', () => {
        const removeTodo = jest.fn();

        const dom  = render(<TodoItem todo={mockTodo} removeTodo={removeTodo} />);
        const buttonRemove = dom.getByText('Remove Todo');

        fireEvent.click(buttonRemove);
        expect(removeTodo).toBeCalledWith(mockTodo.todoId);
    });

    //it('call changeTodoStatus', () => {

    //});
});