import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ component: Component }) => {
  // Accessing user context from AuthContext
  const { user } = useContext(AuthContext);

  // Render the Component if user is authenticated, otherwise redirect to login page
  return user ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
