import { createContext, useContext, useState, useEffect } from 'react';
import {
  isTokenValid,
  getToken,
  getUserFromStorage,
  setUserInStorage,
  removeUserFromStorage,
  removeToken,
} from '@utils/auth';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth on mount
  useEffect(() => {
    const token = getToken();
    const storedUser = getUserFromStorage();

    if (token && isTokenValid(token) && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      // Token invalid or missing, clear storage
      removeToken();
      removeUserFromStorage();
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const logout = () => {
    removeToken();
    removeUserFromStorage();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    setUserInStorage(updatedUser);
  };

  const value = {
    user,
    setUser: updateUser,
    isAuthenticated,
    loading,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
