import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null); // Add state to store user ID

    const verifyToken = async (token) => {
        try {
            const response = await axios.post("http://localhost:8000/authenticateToken", { jwtToken: token });
            if (response.data.valid) {
                setIsAuthenticated(true);
                console.log(response);
                setUserId(response.data.user_id);
            } else {
                localStorage.removeItem('user');
                setUserId(null);
            }
        } catch (error) {
            console.error("Error verifying token", error);
            localStorage.removeItem('user');
            setUserId(null);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('user');
        if (storedToken) {
            verifyToken(storedToken).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token, userId) => {
        setIsAuthenticated(true);
        setUserId(userId);
        localStorage.setItem('user', token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserId(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, userId }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
