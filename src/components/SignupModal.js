import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import BetterAuthSignup from './BetterAuthSignup';
import styles from './SignupModal.module.css';

const SignupModal = () => {
    const { isModalOpen, closeModal } = useContext(ModalContext);

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={closeModal}>
                    &times;
                </button>
                <BetterAuthSignup isModal={true} />
            </div>
        </div>
    );
};

export default SignupModal;