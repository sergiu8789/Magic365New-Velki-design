import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BetProvider } from "./context/BetContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Layout/Main/Main";
import { AuthProvider } from "./context/AuthContextProvider";
import { AppProvider } from "./context/AppContextProvider";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
     <AppProvider>
      <AuthProvider>
        <BetProvider>
         <Main />
       </BetProvider>
      </AuthProvider> 
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
