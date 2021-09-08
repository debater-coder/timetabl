import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';
import config from '../config';

export const AuthContext = createContext(undefined)

export const AuthProvider = ({children}) => {
  return <AuthContext.Provider value={useAuth(config)}>
    {children}
  </AuthContext.Provider>
}