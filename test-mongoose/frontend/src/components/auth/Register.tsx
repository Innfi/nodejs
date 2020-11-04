import React, { Component, MouseEvent, ReactNode } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';


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

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps: RegisterState) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = (e: any) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = (e: any) => { 
        e.preventDefault();

        const newUser: object = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        //console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
    }

    render(): ReactNode {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250.px"}}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} 
                                        value={this.state.name} 
                                        id="name" 
                                        type="text" 
                                        className={classnames("", 
                                            { invalid: errors.name })}/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} 
                                        value={this.state.email} 
                                        id="email" 
                                        type="email" 
                                        className={classnames("", 
                                            { invalid: errors.email})}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} 
                                        value={this.state.password} 
                                        id="password" 
                                        type="password" 
                                        className={classnames("", 
                                            { invalid: errors.password})}/>
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} 
                                        value={this.state.password2} 
                                        id="password2" 
                                        type="password" 
                                        className={classnames("", 
                                            { invalid: errors.password2 })}/>
                                <label htmlFor="password">Confirm Password</label>
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button style={{width: "150px", borderRadius: "3px",
                                        letterSpacing: "1.5px", marginTop: "1rem" }} 
                                    type="submit" className="btn btn-large waves-effect 
                                        waves-light hoverable blue accent-3">
                                Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
   registerUser: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired 
};

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps, { registerUser },
    ) (withRouter(Register));