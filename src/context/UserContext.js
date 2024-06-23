import React, { createContext, useState, useEffect } from 'react';
import { getUsers, addUser as addUserToService, updateUser as updateUserInService, deleteUser as deleteUserFromService } from '../services/mockAuthService';

// Create UserContext using createContext
const UserContext = createContext();

// UserProvider component manages user data state and operations
export const UserProvider = ({ children }) => {
  // State to store users array
  const [users, setUsers] = useState([]);

  // Effect to fetch users data on component mount
  useEffect(() => {
    // Set users state with data fetched from mockAuthService (assuming getUsers fetches initial data)
    setUsers(getUsers());
  }, []);

  // Function to add a new user
  const addUser = (user) => {
    // Add user to mockAuthService and get the newly added user
    const newUser = addUserToService(user);
    // Update users state with the new user added
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  // Function to update an existing user
  const updateUser = (id, updatedUser) => {
    // Update user in mockAuthService and get the updated user
    const updated = updateUserInService(id, updatedUser);
    if (updated) {
      // Update users state by mapping over the array and replacing the updated user
      setUsers(prevUsers => prevUsers.map(user => user.id === id ? updated : user));
    }
  };

  // Function to delete a user
  const deleteUser = (id) => {
    // Delete user from mockAuthService and get boolean indicating success
    const deleted = deleteUserFromService(id);
    if (deleted) {
      // Update users state by filtering out the deleted user
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    }
  };

  // Provide UserContext.Provider to wrap children components with user context
  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children} {/* Render children components wrapped with UserContext */}
    </UserContext.Provider>
  );
};

export default UserContext; // Export UserContext for useContext hook usage
