
import React, { useState, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import styles from './SignupModal.module.css';

const SignupModal = () => {
    const [name, setName] = useState('');
    const [background, setBackground] = useState('Student');
    const { setIsModalOpen } = useContext(ModalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify({ name, background }));
        setIsModalOpen(false);
    };

    const handleSkip = () => {
        setIsModalOpen(false);
        localStorage.setItem('hasSkippedSignup', 'true');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Welcome!</h2>
                <p>Please tell us a bit about yourself to personalize your experience.</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="background">I am a...</label>
                        <select
                            id="background"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                        >
                            <option value="Student">Student</option>
                            <option value="Professional">Professional</option>
                            <option value="Hobbyist">Hobbyist</option>
                        </select>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>Save</button>
                        <button type="button" className={styles.skipButton} onClick={handleSkip}>Skip</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
