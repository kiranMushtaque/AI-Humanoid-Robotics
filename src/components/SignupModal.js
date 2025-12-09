// src/components/SignupModal.js -> Refactored to AuthModal.js
import React, { useState, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import BetterAuthSignin from './BetterAuthSignin';
import BetterAuthSignup from './BetterAuthSignup';
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('signin');
  const { login } = useContext(ModalContext);

  const handleSuccess = (userData) => {
    login(userData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === 'signin' ? styles.active : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'signup' ? styles.active : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </div>
        </div>
        <div className={styles.content}>
          {activeTab === 'signin' ? (
            <BetterAuthSignin onSuccess={handleSuccess} />
          ) : (
            <BetterAuthSignup onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;