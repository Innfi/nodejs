import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';


describe('TodoList component', () => {
    const mockTodoList = [
        {
            todoId: 0,
            text: 'writing unit tests',
            isCompleted: true,
        },
        {
            todoId: 1,
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

    it('calls completeTodo', () => {
        const completeTodo = jest.fn();
        const renderResult = render(<TodoList data={mockTodoList} 
            completeTodo={completeTodo}/>);
        const buttons = renderResult.getAllByText('Complete');
        fireEvent.click(buttons[0]);
        expect(completeTodo).toBeCalledWith(mockTodoList[0].todoId);
    });

    it('calls removeTodo', () => {
        const removeTodo = jest.fn();
        const renderResult = render(<TodoList data={mockTodoList}
            removeTodo={removeTodo} />);
        const removeButtons = renderResult.getAllByText('x');
        fireEvent.click(removeButtons[0]);

        expect(removeTodo).toBeCalledWith(mockTodoList[0].todoId);
    });
});