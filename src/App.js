import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BetProvider } from "./context/BetContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Layout/Main/Main";
import { AuthProvider } from "./context/AuthContextProvider";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BetProvider>
         <Main />
       </BetProvider>
      </AuthProvider> 
    </BrowserRouter>
  );
}

export default App;
