import React from "react";
import { useAuth } from "../hooks/useAuth";

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="layout-container">
      <header className="navbar">
        <div className="navbar-brand">GuideEd_ Chat Pro</div>
        {user && (
          <div className="navbar-actions">
            <span className="user-badge">{user.name} ({user.role})</span>
            <button className="btn-secondary" onClick={logout}>Logout</button>
          </div>
        )}
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} GuideEd_ Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
