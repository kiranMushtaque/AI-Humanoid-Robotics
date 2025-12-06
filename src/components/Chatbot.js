import React, { useState, useEffect } from "react";

const styles = {
  permanentButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
    zIndex: 9998,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    transition: "all 0.3s ease",
  },
  askButton: {
    position: "absolute",
    padding: "10px 20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    zIndex: 9998,
  },
  chatWindow: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "400px",
    height: "550px",
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  },
  header: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  langToggle: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
  },
  contextArea: {
    padding: "12px",
    background: "#f1f5f9",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "14px",
  },
  messages: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  inputArea: {
    display: "flex",
    padding: "12px",
    borderTop: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
  },
  sendButton: {
    marginLeft: "8px",
    padding: "12px 20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selection, setSelection] = useState({ text: "", top: 0, left: 0 });
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("EN");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelection = () => {
    const selected = window.getSelection().toString().trim();
    if (selected) {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelection({
        text: selected,
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    } else {
      setSelection({ text: "", top: 0, left: 0 });
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleSelection);
    return () => document.removeEventListener("mouseup", handleSelection);
  }, []);

  const openChat = (text = null) => {
    if (text) {
      setSelection({ text, top: 0, left: 0 });
    }
    setMessages([]);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelection({ text: "", top: 0, left: 0 });
  };

  // Real RAG backend call
  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query,
          selected_text: selection.text || "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Error: ${data.detail || "Unknown error"}` },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Could not reach backend. Please make sure backend is running on port 8000.",
        },
      ]);
    }

    setIsLoading(false);
    setQuery("");
  };

  return (
    <>
      {/* Permanent floating button */}
      <button style={styles.permanentButton} onClick={() => openChat()}>
        🤖
      </button>

      {/* Floating "Ask AI" button on selection */}
      {selection.text && !isChatOpen && (
        <button
          style={{
            ...styles.askButton,
            top: selection.top,
            left: selection.left,
            transform: "translate(-50%, 0)",
          }}
          onClick={() => openChat(selection.text)}
        >
          ✨ Ask AI
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <h3>AI Assistant</h3>
            <div>
              <button
                style={styles.langToggle}
                onClick={() => setLanguage((l) => (l === "EN" ? "UR" : "EN"))}
              >
                {language === "EN" ? "اردو" : "EN"}
              </button>
              <button style={styles.closeButton} onClick={closeChat}>
                ×
              </button>
            </div>
          </div>

          {selection.text && (
            <div style={styles.contextArea}>
              <strong>Context:</strong>
              <p>"{selection.text}"</p>
            </div>
          )}

          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                }}
              >
                <div
                  style={{
                    padding: "10px 16px",
                    borderRadius: "18px",
                    background: msg.sender === "user" ? "#667eea" : "#f1f5f9",
                    color: msg.sender === "user" ? "white" : "#333",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: "flex-start" }}>Thinking...</div>
            )}
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              style={styles.input}
              placeholder="Type your question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              style={styles.sendButton}
              onClick={handleSend}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
