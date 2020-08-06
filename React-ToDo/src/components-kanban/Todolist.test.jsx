import React from 'react';
import { render } from '@testing-library/react';
import TodoList from './TodoList';


describe('TodoList(kanban)', () => {
    it('calls TodoList', () => {
        const result = render(<TodoList todoType={'dummy'} />);

        expect(result).toBeTruthy();
    });

    it('has Todo type property', () => {
        const todoTypeName = 'OnProgress';

        const result = render(<TodoList todoType={todoTypeName} />);
        
        expect(result.getByText(todoTypeName)).toBeTruthy();
    });
});