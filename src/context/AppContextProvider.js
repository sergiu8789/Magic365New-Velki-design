import { createContext, useState, useContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const initialValues = {
    listLoading: false,
    highlightOdds: true,
    fullMarket: true,
  };
  const [appData, setAppData] = useState(initialValues);
  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
