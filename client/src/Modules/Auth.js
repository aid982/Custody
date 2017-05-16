class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('account', data.account);
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
       return localStorage.getItem('token') !== null;;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('account');
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */

    static getToken() {
        return localStorage.getItem('token');
    }

    static getAccount() {
        return localStorage.getItem('account');
    }

}

export default Auth;