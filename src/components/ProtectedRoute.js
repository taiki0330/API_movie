import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

// ホームページに遷移する処理
function ProtectedRoute({ children }) {
  const {user} = UserAuth();

  if(!user) {
    return <Navigate to='/'/>;
  } else {
    return children;
  }


}

export default ProtectedRoute;
