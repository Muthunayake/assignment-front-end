import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { ApiConstant } from '../api/ApiConstant';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password, onSignupSuccess) => {
        const response = await axios.post(ApiConstant.SIGNIN_URL, {email, password});
        if(response.data.code === 200) {
            setIsAuthenticated(true);
            localStorage.setItem('token', response.data.data.access_token);
            onSignupSuccess('/landing');
        } else {
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const signup = async (values, onSignupSuccess) => {
        try {
            const response = await axios.post(ApiConstant.SIGNUP_URL, values);
            if(response.data.code === 200) {
                await login(values.email, values.password, onSignupSuccess)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};