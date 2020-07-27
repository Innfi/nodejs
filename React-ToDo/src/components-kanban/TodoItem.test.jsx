import React from 'react';
import { render } from '@testing-library/react';
import TodoItem from './TodoItem';


describe('TodoItem(kanban)', () => {
    const mockTodo = {
        todoId: 1,
        text: 'implement kanban',
        todoStatus: 0,
        author: 'Innfi'
    };

    it('call TodoItem', () => {
        const result = render(<TodoItem />);
        expect(result).toBeTruthy();
    });

    it('TodoItem has text', () => {
        const { getByText } = render(<TodoItem {...mockTodo} />);

        const todo = getByText(mockTodo.text);
        expect(todo).toBeTruthy();
    }); 

    it('TodoItem has author', () => {
        const { getByText, findAllByText } = render(<TodoItem {...mockTodo} />);

        const todo = findAllByText(mockTodo.author);
        expect(todo).toBeTruthy();
    });
});