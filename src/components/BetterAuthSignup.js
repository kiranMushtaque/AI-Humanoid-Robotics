// src/components/BetterAuthSignup.js
import React, { useState, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import styles from './BetterAuthSignup.module.css';
// Removed: import { useHistory } from '@docusaurus/router'; // No longer needed as no redirect to signin

const BetterAuthSignup = ({ isModal = false }) => {
    const { closeModal } = useContext(ModalContext);
    // Removed: const history = useHistory(); // No longer needed

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [background, setBackground] = useState('Student');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // Removed: const [showSuccessMessage, setShowSuccessMessage] = useState(false); // No longer needed

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        // Removed: setShowSuccessMessage(false); // No longer needed

        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email format is invalid.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, background }),
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('Failed to parse JSON response:', jsonError);
                setError(`Server responded with non-JSON content or no content (Status: ${response.status}). Please check backend.`);
                return;
            }

            if (!response.ok) {
                if (Array.isArray(data.detail)) {
                    const errorMessages = data.detail.map(err => {
                        if (err.loc && err.loc.length > 1) {
                            return `${err.loc[1]}: ${err.msg}`;
                        }
                        return err.msg;
                    });
                    setError(errorMessages.join('; '));
                } else {
                    setError(data.detail || `Signup failed with status: ${response.status}.`);
                }
            } else {
                setSuccess(data.message || 'User created successfully!');
                // Removed: setShowSuccessMessage(true); // No longer needed
                // No automatic redirect here, no "Go to Sign In" button
                if (isModal) {
                    // Automatically close modal after a short delay for success
                    setTimeout(() => {
                        closeModal();
                    }, 2000);
                }
            }
        } catch (err) {
            console.error('Signup failed:', err);
            setError('Could not connect to the backend server. Please ensure the backend is running at http://localhost:8000.');
        }
    };

    // Removed: handleGoToSignIn function // No longer needed

    const formContent = (
        <form onSubmit={handleSubmit} className={styles.signupForm}>
            <h2>Better-Auth Signup</h2>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>} {/* Always show success if set */}

            {/* Conditionally render form fields if not success */}
            {!success && (
                <>
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
                        <label htmlFor="background">User Background</label>
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
                    <button type="submit" className={styles.submitButton}>Sign Up</button>
                </>
            )}
        </form>
    );

    if (isModal) {
        return formContent;
    }

    return (
        <div className={styles.signupContainer}>
            {formContent}
        </div>
    );
};

export default BetterAuthSignup;