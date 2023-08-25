import { createContext, useState, useContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const initialValues = {
    listLoading: false,
    highlightOdds: localStorage.getItem("highlightOdds") ? false : true,
    fullMarket: localStorage.getItem("fullMarket") ? false : true,
    updatedFancyTime: "",
    updatedPremiumTime: "",
    SportTabActive: "",
    appBetSlipOpen: "",
  };
  const [appData, setAppData] = useState(initialValues);
  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
