import { fetchService } from '../services/fetchService';
import { redirectService } from './redirectService';
import { SESSION_STORAGE_KEY } from '../constants';

class AuthenticationService {

    login(userData, errorHandler) {
        return fetchService.post('login', userData);
    }

    register(userData, errorHandler) {
        
        return fetchService.post('register', userData)
    }

    logout() {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        redirectService.goTo('/');
    }

    isUserAuthenticated() {
        return !!sessionStorage.getItem(SESSION_STORAGE_KEY);
    }
}

export const authenticationService = new AuthenticationService();