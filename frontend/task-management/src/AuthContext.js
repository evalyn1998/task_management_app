import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyToken = async(token)=>{
        console.log("j");
        try{
            const response = await axios.post("http://localhost:8000/authenticateToken",{jwtToken:token})
            if(response.data.valid){
                setIsAuthenticated(true);
            }
            else{
                localStorage.removeItem('user');
            }
        }
        catch(error){
            console.error("Error verifying token",error);
            localStorage.removeItem('user');
        }
    };  
    useEffect(() => {
        const storedToken = localStorage.getItem('user');
        if (storedToken) {
            verifyToken(storedToken);
            // setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
