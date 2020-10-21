import React, { Component } from 'react';
import { Link } from 'react-router-dom';


interface LoginState {
    email: string;
    password: string;
    errors: any;
}

class Login extends Component<LoginState> {
    state: LoginState = {
        email: '',
        password: '',
        errors: {}
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(userData);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">

                </div>
            </div>
        );
    }
}