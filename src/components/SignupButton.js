


import React, { useState, useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import BetterAuthSignup from "./BetterAuthSignup";
import BetterAuthSignin from "./BetterAuthSignin";
import styles from "./AuthModal.module.css"; // optional CSS

const SignupButton = () => {
  const { isModalOpen, openModal, closeModal } = useContext(ModalContext);
  const [mode, setMode] = useState("signup"); // 'signup' or 'signin'
  const [buttonText, setButtonText] = useState("Signup"); // button label

  const handleClick = () => {
    openModal();
    setMode("signup"); // always start modal in signup when user clicks button
  };

  // Called after successful signup
  const handleSignupSuccess = () => {
    setMode("signin"); // switch modal to signin
    setButtonText("Sign In"); // update navbar button
  };

  return (
    <>
      <a
        className="navbar__item navbar__link"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        {buttonText}
      </a>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>

            {mode === "signup" ? (
              <BetterAuthSignup onSuccess={handleSignupSuccess} />
            ) : (
              <BetterAuthSignin />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SignupButton;
