import React from 'react';
import { ModalProvider } from '../context/ModalContext';
import AuthModalAndButton from '../components/AuthModalAndButton';
import WelcomeMessage from '../components/WelcomeMessage'; // Import the new component

export default function Root({ children }) {
  return (
    <ModalProvider>
      <AuthModalAndButton />
      <WelcomeMessage /> {/* Render the WelcomeMessage component */}
      {children}
    </ModalProvider>
  );
}