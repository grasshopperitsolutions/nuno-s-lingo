import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <AppContext.Provider value={{ 
      isDarkMode, 
      setIsDarkMode, 
      alert,
      showAlert,
      closeAlert
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);