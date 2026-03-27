import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Layout Wrapper
const LayoutWrapper = ({ children }) => (
  <MainLayout>{children}</MainLayout>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <LayoutWrapper>
                  <Chat />
                </LayoutWrapper>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
