import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If redirected from sign-up with a success message
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both your email and password.');
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser({ email, password });
      login(user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again or sign up for a free account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card login-card">
        {/* Top-right Sign up link matching wireframe */}
        <div className="auth-card-top-action">
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </div>

        {successMessage && (
          <div className="auth-alert success-alert">
            {successMessage}
          </div>
        )}

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
            <label htmlFor="login-email" className="form-label">
              Your email
            </label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              required
            />
          </div>

          <div className="form-group-row">
            <label htmlFor="login-password" className="form-label">
              Your password
            </label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              required
            />
          </div>

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
