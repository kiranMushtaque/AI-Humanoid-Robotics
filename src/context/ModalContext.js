import React, { createContext } from 'react';
import useBetterAuth from './useBetterAuth';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const { currentUser, login, logout, signup } = useBetterAuth();

    return (
        <ModalContext.Provider value={{ user: currentUser, login, logout, signup }}>
            {children}
        </ModalContext.Provider>
    );
};