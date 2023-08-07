import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { BetPlacePopup } from "../BetPlacePopup/BetPlacePopup";
import ApiService from "../../../services/ApiService";
import { PublicRoutes } from "../../../routes/publicRoutes";
import "../../../assets/css/iconmoon.css";
import "../../../assets/css/style.css";
import { useAuth } from "../../../context/AuthContextProvider";

function Main() {
  const location = useLocation();
  const auth = useAuth();

  const fetchWalletMoney = () => {
    ApiService.wallet()
        .then((res) =>
          auth.setAuth({
            ...auth.auth,
            walletBalance:
              parseFloat(res.data.wallet.amount).toFixed(2) -
              Math.abs(parseFloat(res.data.exposure)).toFixed(2),
            exposure: res.data.exposure,
            fetchWallet : false,
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
              fetchWallet : false,
              showSessionExpire: true,
            });
          }
        });
  }

  useEffect(() => {
    if(auth.auth.fetchWallet && auth.auth.loggedIn)
      fetchWalletMoney();
  },[auth.auth.fetchWallet]);

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
      <BetPlacePopup />
    </React.Fragment>
  );
}

export default Main;
