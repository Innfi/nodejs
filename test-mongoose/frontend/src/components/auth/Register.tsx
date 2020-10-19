import React, { Component } from 'react';
import { Link } from 'react-router-dom';


interface RegisterState {
    name: string;
    email: string;
    password: string;
    password2: string;
    errors: any;
}

class Register extends Component<RegisterState> {
    state: RegisterState = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };

    onChange = (e: any) => {
        this.setState({ [e.target.id]: e.target.value });
    };
}

export default Register;