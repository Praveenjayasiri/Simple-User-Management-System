import React, { createContext, useState } from 'react';
import { login as authLogin } from '../services/mockAuthService'; // Assuming this is a mock authentication service

// Create an AuthContext using createContext
const AuthContext = createContext();

// AuthProvider component manages authentication state
export const AuthProvider = ({ children }) => {
  // State to store authenticated user
  const [user, setUser] = useState(null);

  // Function to perform login
  const login = (username, password) => {
    // Call authentication service (mocked here)
    const authenticatedUser = authLogin(username, password);
    if (authenticatedUser) {
      // Set user state if authentication is successful
      setUser(authenticatedUser);
      return true; // Return true to indicate successful login
    }
    return false; // Return false if login fails
  };

  // Function to perform logout
  const logout = () => setUser(null); // Clear user state on logout

  // Provide AuthContext.Provider to wrap children components with authentication context
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Render children components wrapped with AuthContext */}
    </AuthContext.Provider>
  );
};

export default AuthContext; // Export AuthContext for useContext hook usage
