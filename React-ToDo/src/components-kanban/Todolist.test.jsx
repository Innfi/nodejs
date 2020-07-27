import React from 'react';
import { render } from '@testing-library/react';
import TodoList from './TodoList';


describe('TodoList(kanban)', () => {
    it('calls TodoList', () => {
        const result = render(<TodoList />);

        expect(result).toBeTruthy();
    });

//    it('has status Todo', () => {});
//
//    it('has status On progress', () => {});
//
//    it('has statuc Done', () => {});
//
//    it('handle changing todo status', () => {});
});