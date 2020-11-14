import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoginProps, LoginState, loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import { Dispatch, bindActionCreators } from 'redux';


class Login extends Component<LoginProps, LoginState> {
    state: LoginState = {
        email: '',
        password: '',
        errors: {},
        isAuthenticated: false
    };
   
    static propTypes = {
        loginUser: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        errors: PropTypes.object.isRequired
    };

    componentDidMount() {
        if(this.props.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(
            { [e.target.id]: e.target.value} as unknown as 
            { [K in keyof LoginState] : LoginState[K]}
        );
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px"}}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} 
                                        value={this.state.email} 
                                        id="email" 
                                        type="email" 
                                        className={classnames("", {
                                            invalid: errors.email || errors.emailnotfound
                                        })}/>
                                <label htmlFor="email">Email</label>
                                <span className="red-text">
                                    {errors.email} 
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.onChange} 
                                        value={this.state.password}
                                        id="password" 
                                        type="password" 
                                        className={classnames("", {
                                            invalid: errors.password || 
                                                errors.passwordincorrect
                                        })}/>
                                <label htmlFor="password">Password</label>
                                <span className="red-text">
                                    {errors.password} 
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px"}}>
                                <button style={{ width: "150px", 
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px" ,
                                                marginTop: "1rem" }} 
                                    type="submit" 
                                    className="btn btn-large waves-effect waves-light 
                                        hoverable blue accent-3">
                                    Login
                                    </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: LoginState) => {
    return {
        isAuthenticated: state.isAuthenticated,
        errors: state.errors
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        loginUser
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);
