// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
