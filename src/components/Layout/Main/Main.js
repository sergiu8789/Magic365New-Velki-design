import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ApiService from "../../../services/ApiService";
import { PublicRoutes } from "../../../routes/publicRoutes";
import "../../../assets/css/iconmoon.css";
import "../../../assets/css/style.css";
import { useAuth } from "../../../context/AuthContextProvider";
import { useApp } from "../../../context/AppContextProvider";
import { Loader } from "../Loader/Loader";
import { Offline, Online } from "react-detect-offline";
import { NoInternet } from "../NoInternet/NoInternet";
import { socket } from "../../../services/socket";
import { useIdleTimer } from "react-idle-timer";
import { SessionExpire } from "../SessionExpire/SessionExpire";
import { ToastPopup } from "../ToastPopup/ToastPopup";

function Main() {
  const location = useLocation();
  const auth = useAuth();
  const appData = useApp();
  const navigate = useNavigate();
  const timeout = 5 * 60 * 1000;
  const promptBeforeIdle = 30000;
  const [remaining, setRemaining] = useState(timeout);
  const [sessionExpiredSucees,setSessionExpiredSuccess] = useState(false);

  const fetchWalletMoney = () => {
    ApiService.wallet()
      .then((res) =>
        auth.setAuth({
          ...auth.auth,
          walletBalance:
            parseFloat(res.data.wallet.amount).toFixed(2) -
            Math.abs(parseFloat(res.data.exposure)).toFixed(2),
          exposure: res.data.exposure,
          fetchWallet: false,
        })
      )
      .catch((err) => {
        if (
          err?.response?.data?.statusCode === 401 &&
          err?.response?.data?.message === "Unauthorized"
        ) {
          localStorage.removeItem("bettoken");
          auth.setAuth({
            ...auth.auth,
            loggedIn: false,
            user: {},
            fetchWallet: false,
            showSessionExpire: true,
          });
        }
      });
  };

  const onIdle = () => {
    if(auth.auth.loggedIn){
    auth.setAuth({
      loggedIn: false,
      user: {},
      fetchWallet: false,
      showSessionExpire: false
    });
    setSessionExpiredSuccess(true);
     localStorage.removeItem("bettoken");
     navigate("/");
   }
 };

 const onPrompt = () => {
   if(auth.auth.loggedIn){
     auth.setAuth({
       ...auth.auth,
       showSessionMessage: true,
     });
   }
 }

 const { getRemainingTime,activate } = useIdleTimer({
  onIdle,
  onPrompt,
  timeout, //5 minute idle timeout
  promptBeforeIdle
});


  useEffect(() => {
    if (auth.auth.fetchWallet && auth.auth.loggedIn) fetchWalletMoney();
  }, [auth.auth.fetchWallet]);

  useEffect(() => {
    socket.connect();
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)
    return () => {
      clearInterval(interval)
    }
  }, []);


  useEffect(() => {
    if(!auth.auth.showSessionMessage)
    activate();
  },[auth.auth.showSessionMessage]);

  return (
    <React.Fragment>
      <div
        className={`${
          location.pathname !== "/signup"
            ? styles.wholeAppBackground
            : styles.signupContainer
        } col-12 position-relative`}
        id="wholeAppBackground"
      >
        <div
          className={`${
            location.pathname !== "/signup"
              ? styles.centerMobileMode
              : styles.signupModeBox
          } position-relative m-auto`}
          id="centerMobileMode"
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
      <Loader />
      {/* <Offline>
        <NoInternet />
      </Offline> */}
      <SessionExpire  remaining={remaining}/>
      <ToastPopup
          status={sessionExpiredSucees}
          betbox={sessionExpiredSucees}
          title={"Session Expired!"}
          message={"Your session is expired"}
          setPassChange={(e) => setSessionExpiredSuccess(e)}
        />
    </React.Fragment>
  );
}

export default Main;
