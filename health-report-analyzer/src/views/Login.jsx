import React, { useState } from 'react';
import { login } from '../services/authService';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            onLogin();
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form-box" onSubmit={handleSubmit} autoComplete="off">
                <h2 className="login-heading">Login to Health Analyzer</h2>
                <input
                    className="login-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    autoFocus
                />
                <input
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="login-btn" type="submit">Login</button>
                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
