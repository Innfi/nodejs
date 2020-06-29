import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';


describe ('TodoForm Component', () => {
    it('TodoForm has a label', () => {
        const { getByText } = render(<TodoForm />);

        var labelText = getByText('Add new todo!');
        expect(labelText).toBeTruthy();
    });
    
    it('handleChange is called', () => {
        const handleChange = jest.fn();
        const methodProps = { handleChange };
        const result = render(<TodoForm  {...methodProps} />);
        const input = result.getByLabelText('todo-input');

        fireEvent.change(input, { target : { value : 'dummy todo' } });

        expect(handleChange).toBeTruthy();
    });
    
    it('clears out input after submit', () => {
        const addTodo = jest.fn();
        const methodprops = { addTodo };
        const result = render(<TodoForm {...methodprops} />);
        const input = result.getByLabelText('todo-input');
        const button = result.getByText('add todo');

        expect(button).toBeTruthy();

        fireEvent.change(input, { target: { value: 'submit todo' } });
        fireEvent.click(button);

        expect(addTodo).toBeCalledWith('submit todo');
        expect(input).toHaveAttribute('value', '');
    });
});
