import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import loginImgBanner from "../../../assets/images/login-banner.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

export const Login = () => {
  const [loginSlide, setloginSlide] = useState("true");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setloginSlide("true");
    setTimeout(() => {
      loadCaptchaEnginge(4, "white", "black", "numbers");
    }, 10);
  }, [location.state.login]);

  const gotoHome = () => {
    setloginSlide("false");
    setTimeout(function () {
      navigate(-1);
    }, 250);
  };
  return (
    <React.Fragment>
      <div
        className={`${styles.loginLayer} ${
          loginSlide === "true"
            ? styles.loginSlideLeft
            : styles.loginSlideLeftOut
        } position-absolute h-100 d-inline-block col-12 d-inline-flex flex-column`}
      >
        <div
          className={`position-absolute d-inline-flex align-items-center justify-content-center icon-arrow-left ${styles.loginBackIcon}`}
          onClick={() => gotoHome()}
        ></div>
        <div className={`${styles.loginImgBox} position-relative col-12`}>
          <img
            src={loginImgBanner}
            alt="Login-banner"
            className="col-12 d-inline-block"
          ></img>
        </div>
        <div
          className={`${styles.loginFormContainer} position-absolute d-inline-block col-12`}
        >
          <h1
            className={`${styles.loginTitle} text-uppercase col-12 d-inline-block text-center mt-0`}
          >
            Login
          </h1>
          <div
            className={`${styles.loginFormBox} col-12 d-inline-flex flex-column`}
          >
            <div
              className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
            >
              <input
                id="username"
                name="username"
                autoComplete="off"
                type="text"
                placeholder="Username"
                className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
              />
              <label
                htmlFor="username"
                className={`cursor-text outline-none position-absolute ${styles.withIconFormLabel}`}
              >
                Username
              </label>
              <span
                className={`${styles.loginIcon} position-absolute icon-user`}
              ></span>
              <span className={styles.focusBorder}></span>
            </div>
            <div
              className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
            >
              <input
                id="password"
                name="password"
                autoComplete="off"
                type="password"
                placeholder="Password"
                className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
              />
              <label
                htmlFor="password"
                className={`cursor-text outline-none position-absolute ${styles.withIconFormLabel}`}
              >
                Password
              </label>
              <span
                className={`${styles.loginIcon} position-absolute icon-lock`}
              ></span>
              <span className={styles.focusBorder}></span>
            </div>
            <div
              className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
            >
              <input
                id="verifyCode"
                name="verifyCode"
                autoComplete="off"
                type="number"
                placeholder="Validation"
                className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
              />
              <label
                htmlFor="verifyCode"
                className={`cursor-text outline-none position-absolute ${styles.withIconFormLabel}`}
              >
                Validation Code
              </label>
              <div
                className={`${styles.captchBox} captchBox position-absolute d-inline-flex align-items-center`}
              >
                <LoadCanvasTemplate
                  className={styles.captchCanvas}
                  reloadText={
                    '<span className="reload_captcha" style="font-size:24px;font-weight:500;color:black;">&#x21bb;</span>'
                  }
                />
              </div>
              <span
                className={`${styles.loginIcon} position-absolute icon-shield`}
              ></span>
              <span className={styles.focusBorder}></span>
            </div>
            <div
              className={` d-inline-flex align-items-center col-12 mb-6 position-relative`}
            >
              <input
                id="remember"
                type="checkbox"
                className={`${styles.inputCheckbox} opacity-0 position-absolute`}
              />
              <label
                htmlFor="remember"
                className={`d-inline-flex align-items-center position-relative ${styles.checkRembertext}`}
              >
                Remember me
              </label>
            </div>
            <div
              className={`d-inline-flex justify-content-center col-12 ${styles.loginBtnBox}`}
            >
              <button
                className={`d-inline-flex justify-content-center align-items-center ${styles.loginBtn}`}
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
