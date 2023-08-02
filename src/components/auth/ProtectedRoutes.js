import React from "react";
import { Home } from "../Pages/Home/Home";

export const ProtectedRoutes = (props) => {
  const { element } = props;
  return <Home />;
};
