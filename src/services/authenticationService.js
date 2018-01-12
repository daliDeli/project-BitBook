import { fetchService } from '../services/fetchService';
import { redirectService } from './redirectService';
import { SESSION_STORAGE_KEY } from '../constants';

class AuthenticationService {

    login(userData, errorHandler) {
        fetchService.post('login', userData, this.successLogin, error => errorHandler(error.response.data.error.message));
    }

    register(userData, errorHandler) {
        fetchService.post('register', userData, this.successRegister, error => errorHandler(error.response.data.error.message));
    }

    logout() {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        redirectService.goTo('/');
    }

    successLogin(data) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, data.sessionId);
        redirectService.goTo('/profile');
    }

    successRegister() {
        redirectService.goTo('/');        
    }

    isUserAuthenticated() {
        return !!sessionStorage.getItem(SESSION_STORAGE_KEY);
    }
}

export const authenticationService = new AuthenticationService();