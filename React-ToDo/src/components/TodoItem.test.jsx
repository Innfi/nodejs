import React from 'react';
import { render } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
    const mockTodo = {
        todoId: 1,
        text: 'mock todo text',
        isCompleted: false
    };

    it('TodoItem has text', () => {
        const props = {
            index: 1,
            todo: mockTodo
        };

        const { getByText } = render(<TodoItem {...props} />);

        const text = getByText(mockTodo.text);
        expect(text).toBeTruthy();
    });
});