import React from 'react';
import LoginPage from './loginPage/Login-page';
import HomePage from './profilePage/HomePage';
import { authenticationService } from '../services/authenticationService';

export default class App extends React.Component {

    render() {
        return authenticationService.isUserAuthenticated() 
            ?   <HomePage /> : <LoginPage />;
    }
}
