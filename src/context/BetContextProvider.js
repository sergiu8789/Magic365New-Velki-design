import { createContext, useState, useContext } from "react";

export const BetContext = createContext(null);

export const BetProvider = ({ children }) => {
  //let route = window.location.pathname?.replace("/", "");
  const initialValues = {
    betSlipStatus: false,
    betsLoading: true,
    userMatchBets: [],
    betsList: [],
    selectedMatch: {},
    matchBetList: [],
    betSelection : {}
  };
  const [betData, setBetData] = useState(initialValues);
  return (
    <BetContext.Provider value={{ betData, setBetData }}>
      {children}
    </BetContext.Provider>
  );
};

export const useBet = () => useContext(BetContext);
