import { createContext, useContext, useEffect, useState } from 'react';
import {
  getToken,
  getUserFromStorage,
  isTokenValid,
  removeToken,
  removeUserFromStorage,
  setUserInStorage,
} from '@utils/auth';
import { clearAllCache } from '@utils/cache';
import { setActiveRegistration } from '@data/mockDbsData';

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
    const normalizedUser = nextUser
      ? {
          ...nextUser,
          activeVehicleId: nextUser.activeVehicleId ?? nextUser.vehicles?.[0]?.id ?? null,
        }
      : null;

    setUserState(normalizedUser);
    if (nextUser) {
      setUserInStorage(normalizedUser);
      setIsAuthenticated(true);
    } else {
      removeUserFromStorage();
      setIsAuthenticated(false);
    }
  };

  const setActiveVehicle = (registrationNumber) => {
    setUserState((currentUser) => {
      if (!currentUser) return currentUser;

      const nextVehicle = currentUser.vehicles.find(
        (vehicle) => vehicle.registrationNumber === registrationNumber
      );

      if (!nextVehicle) {
        return currentUser;
      }

      setActiveRegistration(registrationNumber);
      clearAllCache();

      const updatedUser = {
        ...currentUser,
        activeVehicleId: nextVehicle.id,
        activeRegistrationNumber: nextVehicle.registrationNumber,
      };

      setUserInStorage(updatedUser);
      return updatedUser;
    });
  };

  const logout = () => {
    clearAllCache();
    removeToken();
    removeUserFromStorage();
    setUserState(null);
    setIsAuthenticated(false);
  };

  const activeVehicle =
    user?.vehicles?.find((vehicle) => vehicle.id === user.activeVehicleId) ??
    user?.vehicles?.[0] ??
    null;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        activeVehicle,
        setActiveVehicle,
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
