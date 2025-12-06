import React, { useState } from "react";

export default function UrduTranslateButton() {
  const [isUrdu, setIsUrdu] = useState(false);

  const toggleLanguage = () => {
    const newMode = !isUrdu;
    setIsUrdu(newMode);
    document.documentElement.classList.toggle("urdu-mode", newMode);
    document.documentElement.dir = newMode ? "rtl" : "ltr";
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 9999 /* Footer ke oper rahega */,
        padding: "12px 20px",
        backgroundColor: "#667eea",
        color: "white",
        border: "none",
        borderRadius: "50px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5a6fd8")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#667eea")}
    >
      {isUrdu ? "EN" : "اردو"}
    </button>
  );
}
