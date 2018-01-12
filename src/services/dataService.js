import { SESSION_STORAGE_USER_KEY } from '../constants';

import { fetchService } from './fetchService';
import Profile from '../entities/Profile';
import User from '../entities/User';
import Post from '../entities/Post';

class DataService {
    constructor() {
        this.top = 5;
        this.skip = 0;
    }

    fetchProfile(successHandler, errorHandler) {
        fetchService.get('profile',
            profileData => {
                const profile = new Profile(profileData);
                sessionStorage.setItem(SESSION_STORAGE_USER_KEY, profile.userId);
                successHandler(profile);
            },
            error => errorHandler(error));
    }

    updateProfile(data, successHandler, errorHandler) {
        fetchService.put('Profiles', data,
            response => successHandler(response),
            error => errorHandler(error));
    }

    fetchUsers(successHandler, errorHandler, top) {
        fetchService.get(`users?$top=${top}&$skip=${this.skip}`,
            usersData => {
                const users = usersData.map(element => new User(element));
                successHandler(users);
            },
            error => errorHandler(error));
    }

    fetchUsersById(id, successHandler, errorHandler) {
        fetchService.get(`users/${id}`,
            profileData => {
                const profile = new Profile(profileData);
                successHandler(profile);
            },
            error => errorHandler(error));
    }

    fetchAllPosts(successHandler, errorHandler, top) {
        fetchService.get(`Posts?$top=${top}&$orderby=DateCreated desc`,
            postData => {
                const posts = postData.map(post => new Post(post));
                successHandler(posts);
            },
            error => errorHandler(error));
    }

    fetchAnyPosts(postType, id, successHandler, errorHandler) {
        fetchService.get(`${postType}/${id}`,
            postData => {
                const posts = new Post(postData);
                successHandler(posts);
            },
            error => errorHandler(error));
    }

    sendPost(post, successHandler, errorHandler) {
        fetchService.post(`${post.type}Posts`, post,
            post => successHandler(post),
            error => errorHandler(error));
    }

    fetchCommentsPosts(postId, successHandler, errorHandler) {
        fetchService.get(`Comments?postId=${postId}`,
            commentsData => successHandler(commentsData),
            error => errorHandler(error));
    }

    deletePost(id, successHandler, errorHandler) {
        fetchService.delete(`Posts/${id}`,
            postdelete => successHandler(postdelete),
            error => errorHandler(error));
    }

    postComments(data, successHandler, errorHandler) {
        fetchService.post('Comments', data,
            post => successHandler(post),
            error => errorHandler(error));
    }
}

export const dataService = new DataService();