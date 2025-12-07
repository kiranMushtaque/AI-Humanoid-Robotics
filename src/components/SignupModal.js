
import React, { useState, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import styles from './SignupModal.module.css';

const SignupModal = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [background, setBackground] = useState('Student');
    const { setIsModalOpen } = useContext(ModalContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a secure backend.
        // For this demo, we are storing it in localStorage, which is not secure for passwords.
        localStorage.setItem('user', JSON.stringify({ name, email, password, background }));
        setIsModalOpen(false);
    };

    const handleSkip = () => {
        setIsModalOpen(false);
        localStorage.setItem('hasSkippedSignup', 'true');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Create Your Account</h2>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    <p className={styles.disclaimer}>
                        For demonstration purposes, this information will be stored in your browser's local storage.
                        Do not use a real password.
                    </p>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>Sign Up</button>
                        <button type="button" className={styles.skipButton} onClick={handleSkip}>Skip</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
