import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { BetPlacePopup } from "../BetPlacePopup/BetPlacePopup";
import ApiService from "../../../services/ApiService";
import { PublicRoutes } from "../../../routes/publicRoutes";
import "../../../assets/css/iconmoon.css";
import "../../../assets/css/style.css";
import { useIdleTimer } from "react-idle-timer";
import { useAuth } from "../../../context/AuthContextProvider";

function Main() {
  const location = useLocation();
  let navigate = useNavigate();
  const auth = useAuth();

  const timeout = 5 * 60 * 1000;
  const promptBeforeIdle = 30000;
  const [remaining, setRemaining] = useState(timeout);

  const fetchWalletMoney = () => {
    ApiService.wallet()
      .then((res) =>
        auth.setAuth({
          ...auth.auth,
          walletBalance:
            parseFloat(res.data.wallet.amount).toFixed(2) -
            Math.abs(parseFloat(res.data.exposure)).toFixed(2),
          exposure: res.data.exposure,
        })
      )
      .catch((err) => {
        if (
          err?.response?.data?.statusCode === 401 &&
          err?.response?.data?.message === "Unauthorized"
        ) {
          localStorage.removeItem("token");
          auth.setAuth({
            ...auth.auth,
            isloggedIn: false,
            user: {},
            fetchWallet: false,
            showSessionExpire: true,
          });
        }
      });
  };

  useEffect(() => {
    console.log(auth.auth);
    if (auth.auth.fetchWallet && auth.auth.loggedIn) fetchWalletMoney();
  }, [auth.auth.fetchWallet]);

  return (
    <React.Fragment>
      <div
        className={`${
          location.pathname !== "/signup"
            ? styles.wholeAppBackground
            : styles.signupContainer
        } col-12 position-relative`}
      >
        <div
          className={`${
            location.pathname !== "/signup"
              ? styles.centerMobileMode
              : styles.signupModeBox
          } position-relative m-auto`}
        >
          {location.pathname !== "/signup" && <Header />}
          <PublicRoutes />
          {location.pathname === "/sports" ||
          location.pathname === "/leagues" ? (
            <Footer />
          ) : (
            <></>
          )}
        </div>
      </div>
      {location.pathname !== "/signup" && <BetPlacePopup />}
    </React.Fragment>
  );
}

export default Main;
