import React, { useState, useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import styles from './BetterAuthSignup.module.css';

const BetterAuthSignup = () => {
    const { signup } = useContext(ModalContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [background, setBackground] = useState('Student');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }
        setError('');
        setSuccess('');
        setIsLoading(true);
 
        try {
            // The signup function is now synchronous and throws an error on failure
            signup({ name, email, password, background });
            setSuccess('Success! You can now sign in.');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
 
    if (success) {
        return <p className={styles.success}>{success}</p>;
    }
 
    return (
        <form onSubmit={handleSubmit} className={styles.authForm}>
            <h2 className={styles.title}>Create your Account</h2>
            {error && <p className={styles.error}>{error}</p>}
            
            <div className={styles.formGroup}>
                <label htmlFor="signup-name">Name</label>
                <input
                    type="text"
                    id="signup-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="signup-email">Email</label>
                <input
                    type="email"
                    id="signup-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="signup-password">Password</label>
                <input
                    type="password"
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Min. 8 characters"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="background">Your Background</label>
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
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    );
};

export default BetterAuthSignup;