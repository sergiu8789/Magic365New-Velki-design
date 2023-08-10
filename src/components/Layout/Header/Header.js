import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../assets/images/logo.png";
import Aside from "../Aside/Aside";
import { useAuth } from "../../../context/AuthContextProvider";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [openAside, setopenAside] = useState(false);

  const gotoLogin = () => {
    let LoginRand = Math.floor(Math.random() * 100000) + 1;
    navigate("/login", { state: { login: LoginRand } });
  };

  const gotoHome = () => {
    navigate("/");
  };

  const LoaderAnimation = () => {
    return (
      <div
        className={`${styles.loadingBar} ${
          auth.auth.fetchWallet ? "d-flex" : "d-none"
        } align-items-center justify-content-center position-absolute`}
      >
        <span
          className={`${styles.animateLoadBar} ${styles.animateLoadBar1}`}
        ></span>
        <span
          className={`${styles.animateLoadBar} ${styles.animateLoadBar2}`}
        ></span>
        <span
          className={`${styles.animateLoadBar} ${styles.animateLoadBar3}`}
        ></span>
        <span
          className={`${styles.animateLoadBar} ${styles.animateLoadBar4}`}
        ></span>
        <span
          className={`${styles.animateLoadBar} ${styles.animateLoadBar5}`}
        ></span>
        <span
          className={`${styles.animateLoadBar} ${styles.animateLoadBar6}`}
        ></span>
        <span
          className={`${styles.animateLoadBar} ${styles.animateLoadBar7}`}
        ></span>
        <span
          className={`${styles.animateLoadBar} ${styles.animateLoadBar8}`}
        ></span>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Aside openAside={openAside} setopenAside={setopenAside} />
      <div
        className={`${styles.headerBoxRow} col-12 d-inline-flex align-items-center justify-content-between`}
      >
        <div className="left-site-logo-box d-inline-flex align-items-center">
          {location.pathname === "/full-market" ? (
            <span
              className={`${styles.headerMenuIcon} d-inline-flex align-items-center`}
              onClick={() => navigate("/sports")}
            >
              <i className="icon-arrow-left"></i>
            </span>
          ) : auth.auth.loggedIn ? (
            <span
              className={`${styles.headerMenuIcon} d-inline-flex align-items-center`}
              onClick={() => setopenAside(true)}
            >
              <i className="icon-menu"></i>
            </span>
          ) : (
            <></>
          )}
          <img
            className={styles.siteLogoImg}
            src={logo}
            alt="Bet365 Live"
            onClick={gotoHome}
          />
        </div>
        {auth.auth.loggedIn ? (
          <div
            className={`${styles.loginUserBox} d-inline-flex align-items-center position-relative`}
          >
            <div
              className={`${styles.loggedUserBox} d-inline-flex flex-column justify-content-center position-relative`}
            >
              <p className={styles.loogedUserName}>
                {auth?.auth?.user?.username}
              </p>
              <div
                className={`${styles.loggedUserWallet} d-inline-flex align-items-center`}
              >
                <div
                  className={`${styles.loggedWalletAmt} d-inline-flex align-items-center`}
                >
                  <span className={`${styles.loggedAmtLabl} d-inline-flex`}>
                    PBU
                  </span>
                  <span className={`${styles.loggedAmtVal} d-inline-flex`}>
                    {auth.auth.walletBalance
                      ? parseFloat(auth.auth.walletBalance).toFixed(2)
                      : 0}
                  </span>
                </div>
                <div
                  className={`${styles.loggedWalletAmt} d-inline-flex align-items-center`}
                >
                  <span className={`${styles.loggedAmtLabl} d-inline-flex`}>
                    Exp
                  </span>
                  <span className={`${styles.ExposureAmtVal} d-inline-flex`}>
                    ({" "}
                    {auth.auth.exposure
                      ? parseFloat(auth.auth.exposure).toFixed(2)
                      : 0}
                    )
                  </span>
                </div>
              </div>
              {/* HEADER VALUE REFRESH LOADER */}
              <LoaderAnimation />
              {/* ENDS HEADER VALUE REFRESH LOADER */}
            </div>
            <i
              className={`${styles.walletExpVal} icon-refresh`}
              onClick={() => auth.setAuth({ ...auth.auth, fetchWallet: true })}
            ></i>
          </div>
        ) : (
          <div
            className={`d-inline-flex ${styles.loginBtnBox} justify-content-end align-items-center`}
          >
            <button
              className={`${styles.signupBtn} d-inline-flex justify-content-center align-items-center`}
            >
              <i className="icon-sign-up"></i>
              SignUp
            </button>
            <button
              onClick={() => gotoLogin()}
              className={`${styles.loginBtn} d-inline-flex justify-content-center align-items-center`}
            >
              <i className="icon-login"></i>
              Login
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Header;
