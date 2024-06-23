import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider> {/* Wrap entire application with AuthProvider */}
      <UserProvider> {/* Wrap UserProvider within AuthProvider */}
        <Router> {/* Use BrowserRouter as Router for routing */}
          <Main /> {/* Render the Main component which handles routing */}
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

const Main = () => {
  const location = useLocation(); // Use useLocation hook to get current location
  const hideNavbarPaths = ['/login']; // Paths where Navbar should be hidden

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />} {/* Render Navbar except on paths listed in hideNavbarPaths */}
      <Routes> {/* Define routes using Routes component */}
        <Route path="/" element={<Navigate to="/login" />} /> {/* Default redirect to login */}
        <Route path="/login" element={<Login />} /> {/* Route for Login component */}
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} /> {/* Private route for Dashboard component */}
        <Route path="/admin" element={<PrivateRoute component={AdminPanel} requiredRole="admin" />} /> {/* Private route for AdminPanel component with required role */}
      </Routes>
    </>
  );
};

export default App;
