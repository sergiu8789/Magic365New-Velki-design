import { createContext, useState, useContext } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const initialValues = {
    user: localStorage.getItem("bettoken")
      ? jwtDecode(localStorage.getItem("bettoken"))
      : {},
    loggedIn: localStorage.getItem("bettoken") ? true : false,
    fetchWallet : localStorage.getItem("bettoken") ? true : false,
    walletBalance : 0,
    exposure : 0
  };
  const [auth, setAuth] = useState(initialValues);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
