import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';
import SignupModal from './SignupModal';

const AuthModalAndButton = () => {
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const hasSkipped = localStorage.getItem('hasSkippedSignup');
        if (!user && !hasSkipped) {
            setIsModalOpen(true);
        }
    }, [setIsModalOpen]);

    return (
        <>
            {isModalOpen && <SignupModal />}
        </>
    );
};

export default AuthModalAndButton;