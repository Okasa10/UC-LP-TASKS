
import React from 'react'
import { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();


export default function AuthProvider({ children }) {

    //to authenticate the user
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // checks if jwt is stored 
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
            setUser({ token });
        }
    }, []);

    //authorize login function
    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    //seting the states after logout
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove('authToken');
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}


