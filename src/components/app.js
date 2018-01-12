import React from 'react';

import LoginPage from './loginPage/login-page';
import HomePage from './profilePage/homePage';
import { authenticationService } from '../services/authenticationService';

export default class App extends React.Component {

    render() {

        return authenticationService.isUserAuthenticated() 
            ?   <HomePage /> 
            :   <LoginPage />;

    }
}
