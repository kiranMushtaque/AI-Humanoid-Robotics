
import React, { useState } from 'react';

// This is a simplified, non-functional auth component for demonstration.
// In a real app, this would interact with a backend authentication service.

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [background, setBackground] = useState('student');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your auth backend.
    console.log({
      email,
      password,
      background,
    });
    // Simulate a successful signup
    localStorage.setItem('user_background', background);
    localStorage.setItem('user_email', email);
    setIsSignedUp(true);
  };

  if (isSignedUp) {
    return (
      <div className="auth-container">
        <h2>Sign Up Successful!</h2>
        <p>Welcome, {email}!</p>
        <p>Your background is set to: <strong>{background}</strong>.</p>
        <p>You can now enjoy a personalized experience.</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="background">Tell us about yourself:</label>
        <select
          id="background"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="professional">Professional Developer</option>
          <option value="hobbyist">Hobbyist / Enthusiast</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
