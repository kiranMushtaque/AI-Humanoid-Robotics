import React from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import styles from './welcome.module.css';

function WelcomePage() {
    const location = useLocation();
    const user = location.pathname.split('/').pop();

    return (
        <Layout title={`Welcome ${user}`}>
            <div className={styles.welcomeContainer}>
                <div className={styles.welcomeContent}>
                    <h1>Welcome, {user}!</h1>
                    <p>Thank you for signing up. We're excited to have you here.</p>
                </div>
            </div>
        </Layout>
    );
}

export default WelcomePage;

