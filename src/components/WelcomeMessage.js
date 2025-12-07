
import React, { useState, useEffect } from 'react';

const WelcomeMessage = () => {
    const [userName, setUserName] = useState(null);
    const [userBackground, setUserBackground] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const { name, background } = JSON.parse(user);
            setUserName(name);
            setUserBackground(background);
        }
    }, []);

    if (userName && userBackground) {
        return (
            <div style={{ padding: '1rem', backgroundColor: '#e6f7ff', borderLeft: '5px solid #007bff', marginBottom: '1rem' }}>
                <p>Welcome, <strong>{userName}</strong>! Learning mode: <strong>{userBackground}</strong></p>
            </div>
        );
    }
    return null;
};

export default WelcomeMessage;
