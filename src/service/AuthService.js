module.exports = {
    getUser: () => {
        const user = sessionStorage.getItem('user');
        
        if (user === 'undefined' || !user) {
            return null;
        } else {
            return JSON.parse(user);
        }
    },

    getToken: () => {
        return sessionStorage.getItem('token');
    },

    setUserSession: (user, token) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', JSON.stringify(token));
    },

    resetSession: () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }

}