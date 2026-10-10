import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { isFirebaseConfigured } from '../firebase';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      return 'Please enter your full name.';
    }
    // Check for both first and last name as requested in rubric
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length < 2) {
      return 'Please enter both your first and last name.';
    }

    if (!email.trim()) {
      return 'Please enter your email address.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address (e.g., student@deakin.edu.au).';
    }

    if (!password) {
      return 'Please enter a password.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await registerUser({ name, email, password });
      // Redirect automatically to login page with success notice
      navigate('/login', {
        state: { message: '✓ Account created successfully! Please log in with your credentials.' },
      });
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card signup-card">
        {/* Title matching wireframe: Create a DEV@Deakin Account */}
        <h2 className="signup-title">Create a DEV@Deakin Account</h2>

        {error && (
          <div className="auth-alert error-alert">
            {error}
          </div>
        )}

        {!isFirebaseConfigured && (
          <div className="auth-alert info-alert">
            <small>
              💡 <strong>Firestore Setup Tip:</strong> To connect your live Firebase project, add your credentials to the <code>.env</code> file. Simulated storage is currently active for testing.
            </small>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group-row">
            <label htmlFor="signup-name" className="form-label">
              Name*
            </label>
            <input
              id="signup-name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              required
            />
          </div>

          <div className="form-group-row">
            <label htmlFor="signup-email" className="form-label">
              Email*
            </label>
            <input
              id="signup-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              required
            />
          </div>

          <div className="form-group-row">
            <label htmlFor="signup-password" className="form-label">
              Password*
            </label>
            <input
              id="signup-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              required
            />
          </div>

          <div className="form-group-row">
            <label htmlFor="signup-confirm-password" className="form-label">
              Confirm password*
            </label>
            <input
              id="signup-confirm-password"
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=""
              required
            />
          </div>

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create'}
          </button>
        </form>

        <div className="auth-card-footer">
          <span>Already have an account? </span>
          <Link to="/login" className="login-switch-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
