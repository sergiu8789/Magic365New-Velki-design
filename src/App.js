import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BetProvider } from "./context/BetContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/Layout/Main/Main";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <BetProvider>
        <Main />
      </BetProvider>
    </BrowserRouter>
  );
}

export default App;
