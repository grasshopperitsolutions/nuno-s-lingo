import React, { createContext, useContext, useState, useEffect } from "react";
import { loginWithGoogle, logout as logoutUserService, getCurrentUser } from '../services/authService';
import { getUserProfile } from '../services/userService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [user, setUser] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  /**
   * Fetch the Firestore profile for the given auth user and merge
   * persisted preferences (displayName, interfaceLang, theme) into state.
   */
  const loadUserProfile = async (authUser) => {
    if (!authUser?.token || !authUser?.uid) return;
    try {
      const profile = await getUserProfile(authUser.token, authUser.uid);
      // Restore persisted theme
      if (profile?.theme) {
        setIsDarkMode(profile.theme === 'dark');
      }
      // Merge Firestore fields on top of Firebase Auth fields
      setUser((prev) => ({
        ...prev,
        displayName: profile?.displayName ?? prev?.displayName,
        interfaceLang: profile?.interfaceLang ?? 'en',
        theme: profile?.theme ?? 'light',
        photoURL: profile?.photoURL ?? prev?.photoURL,
      }));
    } catch (err) {
      // Non-fatal: user is still logged in, preferences just won't be restored
      showAlert('error', `Could not load your profile: ${err.message}`);
    }
  };

  /**
   * Re-fetch the Firestore profile and sync into context.
   * Call this after a successful settings save.
   */
  const refreshUser = async () => {
    const authUser = await getCurrentUser();
    if (authUser) {
      await loadUserProfile(authUser);
    }
  };

  useEffect(() => {
    getCurrentUser().then((authUser) => {
      if (authUser) {
        setUser(authUser);
        loadUserProfile(authUser);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        setUser(result.user);
        await loadUserProfile(result.user);
      }
      return result;
    } catch (e) {
      showAlert('error', e.message);
      return { success: false };
    }
  };

  const logoutUser = async () => {
    try {
      await logoutUserService();
      setUser(null);
      setIsDarkMode(false);
      return { success: true };
    } catch (e) {
      showAlert('error', e.message);
      return { success: false };
    }
  };

  return (
    <AppContext.Provider value={{
      isDarkMode,
      setIsDarkMode,
      alert,
      showAlert,
      closeAlert,
      user,
      setUser,
      loginGoogle,
      logoutUser,
      refreshUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
