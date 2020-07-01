import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';


describe('TodoList component', () => {
    const mockTodoList = [
        {
            todoId: 1,
            text: 'writing unit tests',
            isCompleted: true,
        },
        {
            todoId: 2,
            text: "writing something more",
            isCompleted: false
        }
    ];

    it('contains todos', () => {
        const props = { 
            data: mockTodoList
        };

        const result = render(<TodoList {...props} />);
        
        expect(result.getByText(mockTodoList[0].text)).toBeTruthy();
        expect(result.getByText(mockTodoList[1].text)).toBeTruthy();
    });
});