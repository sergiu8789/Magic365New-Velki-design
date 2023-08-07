import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { Login } from "../Pages/Login/Login";

export const ProtectedRoutes = (props) => {
  const auth = useContext(AuthContext);
  const { element } = props;
  if (auth.auth.loggedIn) return element;
  else return <Login />;
};
