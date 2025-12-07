
import React, { useState, useEffect } from 'react';

/**
 * A component to conditionally render content based on user background.
 * @param {string} for - The background this content is for ("student", "professional", "hobbyist").
 * @param {string} type - The type of content ("refresher", "deep-dive").
 */
export default function ConditionalContent({ children, for: userType, type }) {
  const [userBackground, setUserBackground] = useState(null);

  useEffect(() => {
    // Get the user's background from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const { background } = JSON.parse(user);
      setUserBackground(background);
    }
  }, []);

  if (!userBackground || userBackground !== userType) {
    return null; // Don't render if the user's background doesn't match
  }

  const style = {
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '8px',
    border: '1px solid',
  };

  if (type === 'refresher') {
    style.backgroundColor = '#e7f3fe';
    style.borderColor = '#d0e0f0';
  } else if (type === 'deep-dive') {
    style.backgroundColor = '#fef6e7';
    style.borderColor = '#f0e5d0';
  }

  return (
    <div style={style}>
      <strong>{type === 'refresher' ? 'Refresher' : 'Deep Dive'} for {userType}s:</strong>
      {children}
    </div>
  );
}
