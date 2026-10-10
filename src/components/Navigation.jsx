import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setInfoMessage(`Search functionality will be implemented in a future task.`);
      setTimeout(() => setInfoMessage(''), 3000);
    }
  };

  const handlePostClick = () => {
    setInfoMessage('The Post feature will be implemented in a future task.');
    setTimeout(() => setInfoMessage(''), 3000);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        {/* DEV@Deakin Brand - links to home page */}
        <Link to="/" className="navbar-brand-link">
          DEV@Deakin
        </Link>

        {/* Search bar matching wireframe */}
        <form className="navbar-search-bar" onSubmit={handleSearchSubmit}>
          <Search size={18} className="navbar-search-icon" />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Right side actions: Post and Login */}
        <div className="navbar-right-links">
          <button
            type="button"
            className="navbar-link-btn"
            onClick={handlePostClick}
          >
            Post
          </button>

          {isAuthenticated ? (
            <div className="navbar-user-group">
              <span className="navbar-user-name" title={user?.email}>
                <User size={15} />
                <span>{user?.name?.split(' ')[0] || 'User'}</span>
              </span>
              <button
                type="button"
                className="navbar-link-btn navbar-logout-btn"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <LogOut size={14} />
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar-link-btn navbar-login-link">
              Login
            </Link>
          )}
        </div>
      </div>

      {infoMessage && (
        <div className="navbar-notice-bar">
          {infoMessage}
        </div>
      )}
    </header>
  );
}
