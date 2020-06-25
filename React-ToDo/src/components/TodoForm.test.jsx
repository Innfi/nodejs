import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';

describe ('TodoForm Component', () => {
    it('TodoForm has a label', () => {
        const { getByText } = render(<TodoForm />);

        var labelText = getByText('Add new todo!');
        expect(labelText).toBeTruthy();
    });
    /*
    it('handleChange is called', () => {
        const handleChange = jest.fn();
        const methodProps = { handleChange };
        const result = render(<TodoForm  {...methodProps} />);
    });
    */
});
