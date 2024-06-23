// Mock user data array
const users = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: 'password', role: 'admin' },
  { id: 2, username: 'user', email: 'user@example.com', password: 'password', role: 'user' },
  { id: 3, username: 'saman', email: 'saman@example.com', password: 'password', role: 'Software Engineer' },
  { id: 4, username: 'praveen', email: 'praveen@example.com', password: 'password', role: 'Recruiter' },
  { id: 5, username: 'ajith', email: 'ajith@example.com', password: 'password', role: 'user' },
  { id: 6, username: 'polan', email: 'polan@example.com', password: 'password', role: 'user' }
];

// Function to simulate user login authentication
const login = (username, password) => {
  // Find user in users array matching username and password
  const user = users.find(u => u.username === username && u.password === password);
  // Return user without password if authenticated, otherwise null
  return user ? { ...user, password: undefined } : null;
};

// Function to get all users, returning them without passwords
const getUsers = () => {
  return users.map(user => ({ ...user, password: undefined }));
};

// Function to add a new user
const addUser = (user) => {
  // Create a new user object with unique id (using Date.now())
  const newUser = { ...user, id: Date.now() };
  // Push the new user object into the users array
  users.push(newUser);
  // Return the new user without password
  return { ...newUser, password: undefined };
};

// Function to update an existing user by id
const updateUser = (id, updatedUser) => {
  // Find the index of the user in users array by id
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    // Update user object at found index with updatedUser properties
    users[index] = { ...users[index], ...updatedUser };
    // Return updated user without password
    return { ...users[index], password: undefined };
  }
  return null; // Return null if user with given id is not found
};

// Function to delete a user by id
const deleteUser = (id) => {
  // Find the index of the user in users array by id
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    // Remove user object from users array at found index and return it without password
    const deletedUser = users.splice(index, 1)[0];
    return { ...deletedUser, password: undefined };
  }
  return null; // Return null if user with given id is not found
};

// Export all functions for use in other parts of the application
export { login, getUsers, addUser, updateUser, deleteUser };
