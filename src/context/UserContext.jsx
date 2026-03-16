import { createContext, useContext, useEffect, useState } from 'react';
import {
  getToken,
  getUserFromStorage,
  isTokenValid,
  removeToken,
  removeUserFromStorage,
  setUserInStorage,
} from '@utils/auth';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const storedUser = getUserFromStorage();

    if (token && isTokenValid(token) && storedUser) {
      setUserState(storedUser);
      setIsAuthenticated(true);
    } else {
      removeToken();
      removeUserFromStorage();
    }

    setLoading(false);
  }, []);

  const setUser = (nextUser) => {
    setUserState(nextUser);
    if (nextUser) {
      setUserInStorage(nextUser);
      setIsAuthenticated(true);
    } else {
      removeUserFromStorage();
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    removeToken();
    removeUserFromStorage();
    setUserState(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loading,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
