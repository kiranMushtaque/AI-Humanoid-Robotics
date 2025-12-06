


import React from "react";
import Chatbot from "@site/src/components/Chatbot";
import UrduTranslateButton from "@site/src/components/UrduTranslateButton";
import BrowserOnly from '@docusaurus/BrowserOnly';
import Head from '@docusaurus/Head';


export default function Root({ children }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      {children}
      <Chatbot />
      <BrowserOnly>
        {() => <UrduTranslateButton />}
      </BrowserOnly>
    </>
  );
}

