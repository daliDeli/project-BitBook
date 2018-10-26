import React, { Component } from 'react';
import M from 'materialize-css';

import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';

class LoginPage extends Component {

    componentDidMount() {
        const el = document.querySelector('.tabs');
        new M.Tabs(el);

    }

    render() {
        return (
            <div className='container'>
                <div className="row landing-container z-depth-3">
                    <div className='col s12 m6'><Welcome /></div>
                    <div className='col s12 m6'>
                        <div className='row'>
                            <div className='col s12'>
                                <div className="row">
                                    <div className='col s12'>
                                        <ul className="tabs">
                                            <li className="tab col s6"><a href="#login">Login</a></li>
                                            <li className="tab col s6"><a href="#register">Register</a></li>
                                        </ul>
                                    </div>
                                    <div id='login' className='col s12'><Login /></div>
                                    <div id='register' className='col s12'><Register /></div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;