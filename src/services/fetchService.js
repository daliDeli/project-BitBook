import axios from 'axios';
import { SESSION_STORAGE_KEY, API_KEY, BASE_URL } from '../constants';

class FetchService {

    headers() {

        let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
        console.log('da li je ID ok ',sessionId);
        return sessionId
            ? { 'SessionId': sessionId, 'Key': API_KEY, 'Content-Type': 'application/json' }
            : { 'Key': API_KEY, 'Content-Type': 'application/json' };
    }

    get(url, successHandler, errorHandler) {
        axios({
            url: `${BASE_URL}${url}`,
            method: 'GET',
            headers: this.headers()
        })
            .then(response => successHandler(response.data))
            .catch(error => errorHandler(error.response));
    }

    post(url, postData) {
        
        return axios({
            method: 'POST',
            url: `${BASE_URL}${url}`,
            data: postData,
            headers: this.headers()
        })
            // .then(response => successHandler(response.data))
            // .catch(error => errorHandler(error));
    }

    put(url, postData, successHandler, errorHandler) {

        axios({
            method: 'PUT',
            url: `${BASE_URL}${url}`,
            data: postData,
            headers: this.headers()
        })
            .then(response => successHandler(response.data))
            .catch(error => errorHandler(error));
    }

    delete(url, successHandler, errorHandler) {

        axios({
            method: 'DELETE',
            url: `${BASE_URL}${url}`,
            headers: this.headers()
        })
            .then(response => successHandler(response.data))
            .catch(error => errorHandler(error));
    }
}

export const fetchService = new FetchService();