import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
    const mockTodo = {
        todoId: 1,
        text: 'mock todo text',
        isCompleted: false
    };

    const props = {
        index: 1,
        todo: mockTodo
    };

    it('TodoItem has text', () => {
        const { getByText } = render(<TodoItem {...props} />);

        const text = getByText(mockTodo.text);
        expect(text).toBeTruthy();
    });

    it('TodoItem not completed by default', () => {
         const { getByText } = render(<TodoItem {...props} />);

         var text = getByText(mockTodo.text);
         expect(text).not.toHaveStyle('text-decoration: line-through');
    });

    it('Calls completeTodo', () => {
        const completeTodo = jest.fn();
        const methodProps = { completeTodo };
        const { getByText } = render(<TodoItem {...props} {...methodProps} />);
        const buttonComplete = getByText('Complete');
        fireEvent.click(buttonComplete);

        expect(completeTodo).toBeCalledWith(mockTodo.todoId);
    });
});