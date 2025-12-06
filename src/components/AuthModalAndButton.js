// src/components/AuthModalAndButton.js
import React, { useState, useContext } from 'react';
import { useHistory } from '@docusaurus/router';
import { ModalContext } from '../context/ModalContext'; // Assuming this context is for general modal management

// CSS Module for this component
const styles = {
    // Combined styles from BetterAuthSignup.module.css and BetterAuthSignin.module.css
    // This assumes some basic Docusaurus theming variables are available
    signupSigninContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px', // Adjust as needed
        backgroundColor: 'var(--ifm-background-color)',
    },
    signupSigninForm: {
        background: 'var(--ifm-background-surface-color)',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center',
        color: 'var(--ifm-font-color-base)',
    },
    signupSigninFormH2: {
        fontFamily: 'var(--ifm-font-family-heading)',
        fontSize: '2rem',
        marginBottom: '2rem',
        color: 'var(--ifm-heading-color)',
    },
    formGroup: {
        marginBottom: '1.25rem',
        textAlign: 'left',
    },
    formGroupLabel: {
        display: 'block',
        marginBottom: '0.6rem',
        color: 'var(--ifm-font-color-secondary)',
        fontWeight: '500',
    },
    formGroupInput: {
        width: '100%',
        padding: '0.85rem 1rem',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '8px',
        boxSizing: 'border-box',
        fontSize: '1rem',
        backgroundColor: 'var(--ifm-background-color)',
        color: 'var(--ifm-font-color-base)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    formGroupInputFocus: { // This would typically be handled by a global stylesheet or a preprocessor
        borderColor: 'var(--ifm-color-primary)',
        boxShadow: '0 0 0 3px rgba(var(--ifm-color-primary-rgb), 0.2)',
        outline: 'none',
    },
    submitButton: {
        width: '100%',
        padding: '0.9rem 1.5rem',
        background: 'linear-gradient(135deg, var(--ifm-color-primary), #764ba2)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.1rem',
        fontWeight: '700',
        marginTop: '1.5rem',
        transition: 'all 0.3s ease',
    },
    submitButtonHover: { // This would typically be handled by a global stylesheet or a preprocessor
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(var(--ifm-color-primary-rgb), 0.4)',
        opacity: '0.9',
    },
    error: {
        color: 'var(--ifm-color-danger)',
        backgroundColor: 'rgba(var(--ifm-color-danger-rgb), 0.1)',
        padding: '0.75rem',
        borderRadius: '6px',
        marginBottom: '1.5rem',
        border: '1px solid var(--ifm-color-danger)',
    },
    success: {
        color: 'var(--ifm-color-success)',
        backgroundColor: 'rgba(var(--ifm-color-success-rgb), 0.1)',
        padding: '0.75rem',
        borderRadius: '6px',
        marginBottom: '1.5rem',
        border: '1px solid var(--ifm-color-success)',
    },
    successMessageContainer: {
        padding: '1.5rem',
        borderRadius: '12px',
        background: 'var(--ifm-background-surface-color)',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        color: 'var(--ifm-font-color-base)',
    }
    // Responsive Adjustments can be added here as needed
};

// --- BetterAuthSignup Component (Integrated) ---
const BetterAuthSignup = ({ onSuccess, isModal = true }) => {
    const { closeModal } = useContext(ModalContext); // Using context to close modal from within
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [background, setBackground] = useState('Student');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

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
                setSuccess(data.message || 'Signup successful!');
                onSuccess(); // Call onSuccess prop to signal parent
            }
        } catch (err) {
            console.error('Signup failed:', err);
            setError('Could not connect to the backend server. Please ensure the backend is running at http://localhost:8000.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.signupSigninForm}>
            <h2 style={styles.signupSigninFormH2}>Better-Auth Signup</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}

            {!success ? ( // Only show form if not successful
                <>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.formGroupLabel}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.formGroupInput}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.formGroupLabel}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.formGroupInput}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="background" style={styles.formGroupLabel}>User Background</label>
                        <select
                            id="background"
                            value={background}
                            onChange={(e) => setBackground(e.target.value)}
                            style={styles.formGroupInput}
                        >
                            <option value="Student">Student</option>
                            <option value="Professional">Professional</option>
                            <option value="Hobbyist">Hobbyist</option>
                        </select>
                    </div>
                    <button type="submit" style={styles.submitButton}>Sign Up</button>
                </>
            ) : null}
        </form>
    );
};


// --- BetterAuthSignin Component (Integrated) ---
const BetterAuthSignin = ({ isModal = true }) => {
    const history = useHistory(); // For redirecting after successful signin
    const { closeModal } = useContext(ModalContext); // Using context to close modal from within
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
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
                    setError(data.detail || `Sign-in failed with status: ${response.status}.`);
                }
            } else {
                setSuccess(data.message || 'Login successful!');
                // Use SPA navigation upon successful sign-in
                if (data.redirect_url) {
                    history.push(data.redirect_url);
                    closeModal(); // Close modal after successful navigation
                } else {
                    // Fallback if redirect_url is not provided by backend
                    history.push(`/welcome/${email}`);
                    closeModal(); // Close modal after successful navigation
                }
            }
        } catch (err) {
            console.error('Sign-in failed:', err);
            setError('Could not connect to the backend server. Please ensure the backend is running at http://localhost:8000.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.signupSigninForm}>
            <h2 style={styles.signupSigninFormH2}>Better-Auth Signin</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}

            {!success ? ( // Only show form if not successful
                <>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.formGroupLabel}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.formGroupInput}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.formGroupLabel}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.formGroupInput}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.submitButton}>Sign In</button>
                </>
            ) : null}
        </form>
    );
};


// --- Main AuthModalAndButton Component ---
const AuthModalAndButton = () => {
    const { isModalOpen, openModal, closeModal, modalContent } = useContext(ModalContext);
    const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'signin'
    const [buttonLabel, setButtonLabel] = useState('Signup');
    const [tempSignupSuccessMessage, setTempSignupSuccessMessage] = useState('');


    // Handler for when signup is successful
    const handleSignupSuccess = () => {
        setAuthMode('signin'); // Switch modal to signin mode
        setButtonLabel('Sign In'); // Change navbar button label
        setTempSignupSuccessMessage('Signup successful! Please sign in.');
        // The modal stays open, now showing the signin form
    };

    const handleOpenModal = () => {
        openModal(
            <div style={styles.signupSigninContainer}>
                {authMode === 'signup' ? (
                    <BetterAuthSignup onSuccess={handleSignupSuccess} />
                ) : (
                    <BetterAuthSignin />
                )}
            </div>
        );
    };

    // When modal closes, clear any temporary success message
    const handleCloseModal = () => {
        closeModal();
        setTempSignupSuccessMessage('');
        // Do not reset authMode or buttonLabel here, as they should persist
    };


    return (
        <>
            <button
                className="button button--secondary navbar-signup-button" // Use Docusaurus button styles
                onClick={handleOpenModal}
            >
                {buttonLabel}
            </button>
            {/* The actual modal rendering logic is assumed to be handled by ModalContext,
                which in turn uses an Ant Design Modal or similar.
                For demonstration, assume ModalContext renders a div-based modal.
                If ModalContext uses an actual <Modal> component, this is fine.
             */}
            {/* If ModalContext does not manage the actual Modal component, you'd need something like: */}
            {/* <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={handleCloseModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {modalContent}
                </div>
            </div> */}
        </>
    );
};

export default AuthModalAndButton;

