import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.css";
import loginImgBanner from "../../../assets/images/login-banner.png";

export const ChangePassword = () => {
  const [loginSlide, setloginSlide] = useState("true");
  const [newPassword, setnewPassword] = useState("password");
  const [confirmPassword, setconfirmPassword] = useState("password");
  const [yourPassword, setyourPassword] = useState("password");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setloginSlide("true");
  }, [location.state.login]);

  const gotoHome = () => {
    setloginSlide("false");
    setTimeout(function () {
      navigate(-1);
    }, 250);
  };

  const showPasswordText = (passwordTyp) => {
    if (passwordTyp === "newPassword") {
      if (newPassword === "password") {
        setnewPassword("text");
      } else {
        setnewPassword("password");
      }
    } else if (passwordTyp === "confirmPassword") {
      if (confirmPassword === "password") {
        setconfirmPassword("text");
      } else {
        setconfirmPassword("password");
      }
    } else if (passwordTyp === "originPassword") {
      if (yourPassword === "password") {
        setyourPassword("text");
      } else {
        setyourPassword("password");
      }
    }
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
            className={`${styles.loginTitle} col-12 d-inline-block text-center mt-0`}
          >
            Change Password
          </h1>
          <div
            className={`${styles.loginFormBox} col-12 d-inline-flex flex-column`}
          >
            <div
              className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
            >
              <input
                id="newPassword"
                name="newPassword"
                autoComplete="off"
                type={newPassword}
                placeholder="New Password"
                className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
              />
              <label
                htmlFor="newPassword"
                className={`cursor-text outline-none position-absolute ${styles.withIconFormLabel}`}
              >
                New Password
              </label>
              <span
                className={`${styles.loginIcon} ${
                  newPassword === "password"
                    ? "icon-visibility-off"
                    : "icon-visibility-on"
                } position-absolute`}
                onClick={() => showPasswordText("newPassword")}
              ></span>
              <span className={styles.focusBorder}></span>
            </div>
            <div
              className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
            >
              <input
                id="confirm"
                name="confirm"
                autoComplete="off"
                type={confirmPassword}
                placeholder="New Password Confirm"
                className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
              />
              <label
                htmlFor="confirm"
                className={`cursor-text outline-none position-absolute ${styles.withIconFormLabel}`}
              >
                New Password Confirm
              </label>
              <span
                className={`${styles.loginIcon} ${
                  confirmPassword === "password"
                    ? "icon-visibility-off"
                    : "icon-visibility-on"
                } position-absolute`}
                onClick={() => showPasswordText("confirmPassword")}
              ></span>
              <span className={styles.focusBorder}></span>
            </div>
            <div
              className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
            >
              <input
                id="originPassword"
                name="originPassword"
                autoComplete="off"
                type={yourPassword}
                placeholder="Your Password"
                className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
              />
              <label
                htmlFor="originPassword"
                className={`cursor-text outline-none position-absolute ${styles.withIconFormLabel}`}
              >
                Your Password
              </label>
              <span
                className={`${styles.loginIcon} ${
                  yourPassword === "password"
                    ? "icon-visibility-off"
                    : "icon-visibility-on"
                } position-absolute`}
                onClick={() => showPasswordText("originPassword")}
              ></span>
              <span className={styles.focusBorder}></span>
            </div>
            <div
              className={`d-inline-flex justify-content-center col-12 ${styles.loginBtnBox}`}
            >
              <button
                className={`d-inline-flex justify-content-center align-items-center ${styles.loginBtn}`}
                type="submit"
              >
                Change
              </button>
            </div>
          </div>
          <div
            className={`${styles.ChangePasswordPoints} col-12 d-inline-block`}
          >
            <ul
              className={`${styles.ChangePointsList} m-0 list-styled list-disc col-12`}
            >
              <li className={`${styles.ChangePoints} position-relative col-12`}>
                Password must have 8 to 15 alphanumeric without white space
              </li>
              <li className={`${styles.ChangePoints} position-relative col-12`}>
                Password cannot be the same as username / nickname
              </li>
              <li className={`${styles.ChangePoints} position-relative col-12`}>
                Must contain at least 1 capital letter, 1 small letter and 1
                number
              </li>
              <li className={`${styles.ChangePoints} position-relative col-12`}>
                Password must not contain any special characters (!,@,#,etc..)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
