import React, { Component } from 'react';
import { redirectService } from '../../services/redirectService';
import { authenticationService } from '../../services/authenticationService';
import { validationService } from '../../services/validationService';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    // Initialization methods

    initState() {
        return {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmedPassword: '',
            errorMessage: '',
            errorMessageDisplayed: false,
            loginSuccessful: false,
        };
    }

    bindEventHandlers() {
        this.updateValue = this.updateValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
        // this.errorHandler = this.errorHandler.bind(this);
    }

    updateValue({ target }) {
        this.setState({
            [target.id]: target.value
        });
    }

    submitForm(event) {
        this.setState({
            errorMessage: ''
        })
        event.preventDefault();

        const { name, password, confirmedPassword, email, username } = this.state;

        let userData = {
            name,
            password,
            confirmedPassword,
            email,
            username
        };

        let validated = validationService.validateRegister();

        if (validated) {
            authenticationService.register(userData)
                .then(response => {
                    this.setState({ loginSuccessful: true });
                    setTimeout(redirectService.reload, 2000);

                })
                .catch(error => {
                    console.log('error', error)
                    this.setState({
                        errorMessage: error.response.data.error.message || 'We have an error on our servers',
                        errorMessageDisplayed: true,
                    });
                });

        }
    }

    // errorHandler(errorMessage) {

    // }

    render() {

        return (
            <div className="row form-welcome">
                <form className="col s12" id="register-form" onSubmit={this.submitForm}>
                    <div className="input-field col s12">
                        <input id="name" type="text" required="" className="validate" onChange={this.updateValue} value={this.state.name} />
                        <label htmlFor="name">Name</label>
                        <span className="helper-text" data-error="Name is required" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id="username" type="text" className="validate" required="" onChange={this.updateValue} value={this.state.username} />
                        <label htmlFor="username">Username</label>
                        <span className="helper-text" data-error="username is required" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" onChange={this.updateValue} value={this.state.email} />
                        <label htmlFor="email">Email</label>
                        <span className="helper-text" data-error="Invalid email format" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate" required="" onChange={this.updateValue} value={this.state.password} />
                        <label htmlFor="password">Password</label>
                        <span className="helper-text" data-error="password needs to be at least 6 characters long" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id="confirmedPassword" type="password" className="validate" onChange={this.updateValue} value={this.state.confirmedPassword} />
                        <label htmlFor="confirmedPassword">Confirm Password</label>
                        <span className="helper-text" data-error="password not matching" data-success="success"></span>
                    </div>
                    <button type="submit" className="btn waves-effect waves-light right">Register</button>
                </form>
                {this.state.errorMessageDisplayed &&
                    <div className={['col', 's12', 'error-box'].join(' ')}>
                        <p>Small problem but ...</p>
                        <p className='error-message'>{this.state.errorMessage}</p>
                        <p>Please try again, thank you.</p>
                    </div>
                }
                {this.state.loginSuccessful &&
                    <div className={['col', 's12','loginSuccessful'].join(' ')}>
                        <p> You have created a new profile and will be redirected to Login Page... </p>
                        <p>Thank you and enjoy</p>
                    </div>
                }
            </div>
        );
    }
}

export default Register;
