import React from 'react';
import { ModalProvider } from '../context/ModalContext';
import Chatbot from '../components/Chatbot';

export default function Root({ children }) {
  return (
    <ModalProvider>
      {children}
      <Chatbot />
    </ModalProvider>
  );
}