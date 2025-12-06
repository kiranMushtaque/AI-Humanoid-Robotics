


import React, { useContext, useLayoutEffect } from "react";
import Chatbot from "@site/src/components/Chatbot";
import UrduTranslateButton from "@site/src/components/UrduTranslateButton";
import BrowserOnly from '@docusaurus/BrowserOnly';
import Head from '@docusaurus/Head';
import { ModalContext, ModalProvider } from '../context/ModalContext';
import SignupModal from '../components/SignupModal';

function AppWrapper({children}) {
  const { openModal } = useContext(ModalContext);

  useLayoutEffect(() => {
    const signupButton = document.querySelector('.navbar-signup-button');
    if (signupButton) {
      const clickHandler = (e) => {
        e.preventDefault();
        openModal();
      };
      signupButton.addEventListener('click', clickHandler);
      
      // Cleanup the event listener on component unmount
      return () => {
        signupButton.removeEventListener('click', clickHandler);
      };
    }
  }, [openModal]);

  return <>{children}</>;
}


export default function Root({ children }) {
  return (
    <ModalProvider>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <AppWrapper>{children}</AppWrapper>
      <Chatbot />
      <BrowserOnly>
        {() => <UrduTranslateButton />}
      </BrowserOnly>
      <SignupModal />
    </ModalProvider>
  );
}

