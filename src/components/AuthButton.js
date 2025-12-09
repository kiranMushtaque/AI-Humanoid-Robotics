import React, { useState, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import AuthModal from './SignupModal'; // Renamed to AuthModal conceptually
import styles from './AuthButton.module.css';

const AuthButton = () => {
  const { user, login, logout } = useContext(ModalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSignout = () => {
    logout();
  };

  if (user && user.email) {
    // User is logged in
    return (
      <div className={styles.authButton}>
        <span className={styles.welcomeMessage}>
          Welcome, {user.name}! | Mode: <strong>{user.background}</strong>
        </span>
        <button
          className={`${styles.button} ${styles.logoutButton}`}
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    // User is not logged in
    return (
      <>
        <button
          className={`${styles.button} ${styles.loginButton}`}
          onClick={openModal}
        >
          Sign Up / Login
        </button>
        <AuthModal isOpen={isModalOpen} onClose={closeModal} />
      </>
    );
  }
};

export default AuthButton;