import React, { Component } from 'react';
import { redirectService } from '../../services/redirectService';
import { authenticationService } from '../../services/authenticationService';
import { validationService } from '../../services/validationService';
import { SESSION_STORAGE_KEY } from '../../constants';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            lusername: '',
            lpassword: '',
            lerrorMessage: '',
            isHidden: true
        };
    }

    bindEventHandlers() {
        this.submitForm = this.submitForm.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
    }


    updateValue({ target }) {
        this.setState({
            [target.id]: target.value
        });
    }


    submitForm(event) {
        event.preventDefault();

        const { lusername, lpassword } = this.state;

        let userData = {
            username: lusername,
            password: lpassword
        };

        let validated = validationService.validateLogin();
        if (validated === true) {
            authenticationService.login(userData, this.errorMessage)
                .then(data => {
                    sessionStorage.setItem(SESSION_STORAGE_KEY, data.data.sessionId);
                    redirectService.goTo('/profile');
                })
                .catch(this.errorMessage)
        }
    }

    errorMessage({errorMessage}) {
        console.log(errorMessage)
        this.setState({ errorMessage, isHidden: false });
    }

    render() {

        return (
            <div className="row form-welcome">
                <form className="col s12" onSubmit={this.submitForm} >

                    <div className="input-field col s12">
                        <input id="lusername" type="text" onChange={this.updateValue} value={this.state.email} />
                        <label htmlFor="lusername">Username</label>
                        <span className="helper-text" data-error="username is required" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id="lpassword" onChange={this.updateValue} type="password" value={this.state.password} />
                        <label htmlFor="lpassword">Password</label>
                        <span className="helper-text" data-error="password need to be at least 6 char long" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <button type="submit" className="btn waves-effect waves-light right">Login</button>
                    </div>
                </form>
                <div className={['col', 's12', this.state.isHidden && 'hide'].join(' ')}>
                    <div className='error-box'>
                        <p className='error-message'>{this.state.errorMessage}</p>
                        <p>PLEASE TRY AGAIN!</p>
                    </div>
                </div>
            </div>
        );
    }
}

