import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { ToastPopup } from "../../Layout/ToastPopup/ToastPopup";
import loginImgBanner from "../../../assets/images/login-banner.png";
import { Form } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import ApiService from "../../../services/ApiService";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useAuth } from "../../../context/AuthContextProvider";
import { useApp } from "../../../context/AppContextProvider";

export const Login = () => {
  const auth = useAuth();
  const [loginSlide, setloginSlide] = useState("true");
  const [yourPassword, setyourPassword] = useState("password");
  const [passChange, setPassChange] = useState(false);
  const [passChangeTitle, setpassChangeTitle] = useState(false);
  const [passChangeMsg, setpassChangeMsg] = useState(false);
  const [passStatus, setpassStatus] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const appData = useApp();
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  const [form, setForm] = useState({
    username: {
      value: "",
      error: false,
      errorMessage: "",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "",
      showPassword: false,
    },
    captcha: {
      value: "",
      error: false,
      errorMessage: "",
    },
  });

  const gotoHome = () => {
    setloginSlide("false");
    setTimeout(function () {
      navigate(-1);
    }, 250);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "captcha" && e.target.value.length > 4) {
      return;
    } else {
      setForm({
        ...form,
        [name]: {
          ...form[name],
          error: false,
          value,
        },
      });
    }
  };

  const showPasswordText = () => {
    if (yourPassword === "password") {
      setyourPassword("text");
    } else {
      setyourPassword("password");
    }
  };

  /********* Check form field  validations  *********/
  const checkValidation = () => {
    if (
      !form?.captcha?.value ||
      !form?.username?.value ||
      !form?.password?.value
    ) {
      setForm({
        ...form,
        captcha: {
          ...form["captcha"],
          errorMessage: !form.captcha.value ? "Please Enter Captcha Code!" : "",
          error: !form.captcha.value ? true : false,
        },
        username: {
          ...form["username"],
          errorMessage: !form.username.value ? "Please Enter Username!" : "",
          error: !form.username.value ? true : false,
        },
        password: {
          ...form["password"],
          errorMessage: !form.password.value ? "Please Enter Password!" : "",
          error: !form.password.value ? true : false,
        },
      });
      return false;
    } else return true;
  };

  /********** On Submit Login Form ***********/
  const onLogin = (e) => {
    e.preventDefault();
    if (validateCaptcha(form.captcha.value)) {
      if (checkValidation()) {
        appData.setAppData({ ...appData.appData, listLoading: true });
        const payload = {
          email: form.username.value,
          password: form.password.value,
        };
        ApiService.login(payload)
          .then((res) => {
            if (res?.data) {
              if (res.data.token) {
                appData.setAppData({ ...appData.appData, listLoading: false });
                setPassChange(true);
                setpassChangeTitle("Login Success");
                setpassChangeMsg("You have been LoggedIn successfully.");
                setpassStatus(true);
                const user = jwtDecode(res.data.token);
                navigate("/");
                auth.setAuth({
                  ...auth.auth,
                  user: user,
                  loggedIn: true,
                  fetchWallet: true,
                });
                localStorage.setItem("bettoken", res.data.token);
              }
            }
            if (res.status === 202) {
              appData.setAppData({ ...appData.appData, listLoading: false });
              setPassChange(true);
              setpassChangeTitle("Failed to Login");
              setpassChangeMsg("Your credentials are Incorrect.");
              setpassStatus(false);
            }
          })
          .catch((err) => {
            appData.setAppData({ ...appData.appData, listLoading: false });
            if (err.response.status === 401) {
              setPassChange(true);
              setpassChangeTitle("Failed to Login");
              setpassChangeMsg("Your credentials are Incorrect.");
              setpassStatus(false);
            } else {
              setPassChange(true);
              setpassChangeTitle("Failed to Login");
              setpassChangeMsg("Network error.");
              setpassStatus(false);
            }
          });
      }
    } else {
      setForm({
        ...form,
        captcha: {
          ...form["captcha"],
          errorMessage: "Captcha Code is Invalid",
          error: true,
        },
      });
    }
  };

  useEffect(() => {
    setloginSlide("true");
    /********** On Captcha Login Form ***********/
    setTimeout(() => {
      loadCaptchaEnginge(4, "white", "black", "numbers");
    }, 10);
    /********** On Captcha Login Form ***********/
  }, [location?.state?.login]);

  return (
    <React.Fragment>
      <Form onSubmit={onLogin}>
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
            role="button"
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
              <div className="col-12 d-inline-block">
                <div
                  className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
                >
                  <Form.Control
                    id="username"
                    name="username"
                    autoComplete="off"
                    type="text"
                    placeholder="Username"
                    className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
                    onChange={handleChange}
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
                {form.username.error && (
                  <div className={`${styles.formError} col-12 d-inline-flex`}>
                    {form.username.errorMessage}
                  </div>
                )}
              </div>
              <div className="col-12 d-inline-block">
                <div
                  className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
                >
                  <Form.Control
                    id="password"
                    name="password"
                    autoComplete="off"
                    type={yourPassword}
                    placeholder="Password"
                    className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
                    onChange={handleChange}
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
                  <span
                    className={`${styles.passwordIcon} ${
                      yourPassword === "password"
                        ? "icon-visibility-off"
                        : "icon-visibility-on"
                    } position-absolute`}
                    onClick={showPasswordText}
                    role="button"
                  ></span>
                  <span className={styles.focusBorder}></span>
                </div>
                {form.password.error && (
                  <div className={`${styles.formError} col-12 d-inline-flex`}>
                    {form.password.errorMessage}
                  </div>
                )}
              </div>
              <div className="col-12 d-inline-block">
                <div
                  className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
                >
                  <Form.Control
                    id="verifyCode"
                    name="captcha"
                    autoComplete="off"
                    type="number"
                    placeholder="Validation"
                    className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) =>
                      exceptThisSymbols.includes(e.key) && e.preventDefault()
                    }
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
                {form.captcha.error && (
                  <div className={`${styles.formError} col-12 d-inline-flex`}>
                    {form.captcha.errorMessage}
                  </div>
                )}
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
      </Form>
      {passChange && (
        <ToastPopup
          status={passStatus}
          betbox={true}
          title={passChangeTitle}
          message={passChangeMsg}
          setPassChange={setPassChange}
        />
      )}
    </React.Fragment>
  );
};
