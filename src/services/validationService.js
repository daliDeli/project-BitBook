import $ from 'jquery';

class ValidationService {

    validateLogin() {

        if ($('#lusername').val() === '') {
            $('#lusername').addClass('invalid');
            $('#lusername').prop('aria-invalid', 'true');
            return false;
        }
        if ($('#lpassword').val().length < 6) {
            $('#lpassword').addClass('invalid');
            $('#lpassword').prop('aria-invalid', 'true');
            return false;
        }
        return true;
    }

    validateRegister() {

        if ($('#name').val() === '') {
            $('#name').addClass('invalid');
            $('#name').prop('aria-invalid', 'true');
            return false;
        }
        if ($('#username').val() === '') {
            $('#username').addClass('invalid');
            $('#username').prop('aria-invalid', 'true');
            return false;
        }
        let reg = /\S+@\S+\.\S+/;
        if (!reg.test($('#email').val())) {
            $('#email').addClass('invalid');
            $('#email').prop('aria-invalid', 'true');
            return false;
        }
        if ($('#password').val().length < 6) {
            $('#password').addClass('invalid');
            $('#password').prop('aria-invalid', 'true');
            return false;
        }
        if ($('#confirmedPassword').val() !== $('#password').val()) {
            $('#confirmedPassword').addClass('invalid');
            $('#confirmedPassword').prop('aria-invalid', 'true');
            return false;
        }
        return true;
    }

    validateEditProfile() {

        if ($('#name').val() === '') {
            $('#name').addClass('invalid');
            $('#name').prop('aria-invalid', 'true');
            return false;
        }
        let reg = /\S+@\S+\.\S+/;
        if (!reg.test($('#email').val())) {
            $('#email').addClass('invalid');
            $('#email').prop('aria-invalid', 'true');
            return false;
        }
        if ($('#about').val() === '') {
            $('#about').addClass('invalid');
            $('#about').prop('aria-invalid', 'true');
            return false;
        }
        if ($('#aboutShort').val() === '') {
            $('#aboutShort').addClass('invalid');
            $('#aboutShort').prop('aria-invalid', 'true');
            return false;
        }

        let url = /^(http|https):\/\//;
        if (!url.test($('#avatarUrl').val())) {
            $('#avatarUrl').addClass('invalid');
            $('#avatarUrl').prop('aria-invalid', 'true');
            return false;
        }
        return true;
    }
}

export const validationService = new ValidationService();