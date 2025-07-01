// Simulated authentication
export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'user@example.com' && password === 'password') {
                localStorage.setItem('authToken', 'fake_jwt_token');
                resolve();
            } else {
                reject(new Error('Authentication failed'));
            }
        }, 500);
    });
};
