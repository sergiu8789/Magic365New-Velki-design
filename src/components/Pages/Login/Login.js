import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
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

export const Login = () => {
  const [loginSlide, setloginSlide] = useState("true");
  const [loginErrorMesg, setloginErrorMesg] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    setForm({
      ...form,
      [name]: {
        ...form[name],
        error: false,
        value,
      },
    });
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
    if (checkValidation()) {
      //if (validateCaptcha()) {
      const payload = {
        email: form.username.value,
        password: form.password.value,
      };
      ApiService.login(payload)
        .then((res) => {
          console.log(res);
          if (res?.data) {
            if (res.data.token) {
              setloginErrorMesg("");
              const user = jwtDecode(res.data.token);
              navigate("/");
              auth.setAuth({
                ...auth.auth,
                user: user,
                loggedIn: true,
                showSucessMessage: true,
                openLoginPopup: false,
                successMessage: "LogIn Successfully!",
              });
            }
          }
          if (res.status === 202) {
            setloginErrorMesg("Invalid User");
          }
        })
        .catch((err) => {
          setloginErrorMesg(err);
        });
      //}
    }
  };

  useEffect(() => {
    console.log(form);
    if (form.username.errorMessage != "") {
      setloginErrorMesg(form.username.errorMessage);
    } else if (form.password.errorMessage != "") {
      setloginErrorMesg(form.password.errorMessage);
    } else if (form.captcha.errorMessage != "") {
      setloginErrorMesg(form.captcha.errorMessage);
    }
  }, [form]);

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
              <div
                className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
              >
                <Form.Control
                  id="password"
                  name="password"
                  autoComplete="off"
                  type="password"
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
                <span className={styles.focusBorder}></span>
              </div>
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
                  onChange={handleChange}
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
              {loginErrorMesg != "" && (
                <div className={`${styles.formError} col-12 d-inline-flex`}>
                  {loginErrorMesg}
                </div>
              )}
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
    </React.Fragment>
  );
};
