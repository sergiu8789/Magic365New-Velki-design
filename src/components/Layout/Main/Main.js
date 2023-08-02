import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { PublicRoutes } from "../../../routes/publicRoutes";
import "../../../assets/css/iconmoon.css";
import "../../../assets/css/style.css";
import { useIdleTimer } from "react-idle-timer";

function Main() {
  const location = useLocation();
  let navigate = useNavigate();
  const timeout = 5 * 60 * 1000;
  const promptBeforeIdle = 30000;
  const [remaining, setRemaining] = useState(timeout);
  return (
    <React.Fragment>
      <div className="whole-app-background col-12 position-relative">
        <div className="center-mobile-mode position-relative m-auto">
          <Header />
          <PublicRoutes />
          {location.pathname === "/sports" ||
          location.pathname === "/leagues" ? (
            <Footer />
          ) : (
            <></>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
