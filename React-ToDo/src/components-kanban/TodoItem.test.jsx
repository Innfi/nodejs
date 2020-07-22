import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';


describe('TodoItem(kanban) Component', () => {
    const mockTodo = {
        todoId: 1,
        text: 'implement kanban',
        todoStatus: 0
    };

    const props = {
        index: 1,
        todo: mockTodo
    };

    //it('call TodoItem', () => {
    //    const result = render(<TodoItem />);
    //});

    //it('TodoItem has text', () => {
    //    const { getByText } = render(<TodoItem {...props} />);

    //    const text = getByText(mockTodo.text);
    //    expect(text).toBeTruthy();
    //}); 

    //it('TodoItem has initial status', () => {

    //});
});