import { createContext, useState, useContext } from "react";

export const ExposureContext = createContext(null);

export const ExposureProvider = ({ children }) => {
  const [exchangeExpoData, setExchangeExpoData] = useState({});
  const [bookmakerExpoData,setBookmakerExpoData] = useState({});
  const [premiumExpoData,setPremiumExpoData] = useState({});
  const [fancyExpoData,setFancyExpoData] = useState({});
  return (
    <ExposureContext.Provider value={{ exchangeExpoData, setExchangeExpoData, 
    bookmakerExpoData,setBookmakerExpoData , premiumExpoData,setPremiumExpoData, fancyExpoData,setFancyExpoData }}>
      {children}
    </ExposureContext.Provider>
  );
};

export const useExposure = () => useContext(ExposureContext);
