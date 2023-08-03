import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import loginImgBanner from "../../../assets/images/login-banner.png";
import { Form } from "react-bootstrap";
import ApiService from "../../../services/ApiService";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

export const Login = () => {
  const [loginSlide, setloginSlide] = useState("true");
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
    console.log(form)
    if (
      !form?.captcha?.value ||
      !form?.username?.value ||
      !form?.password?.value
    ) {
      setForm({
        ...form,
        captcha: {
          ...form["captcha"],
          errorMessage: !form.captcha.value
            ? "Please Enter Captcha Code!"
            : "",
          error: !form.captcha.value ? true : false,
        },
        username: {
          ...form["username"],
          errorMessage: !form.username.value
            ? "Please Enter Username!"
            : "",
          error: !form.username.value ? true : false,
        },
        password: {
          ...form["password"],
          errorMessage: !form.password.value
            ? "Please Enter Password!"
            : "",
          error: !form.password.value ? true : false,
        },
      });
     return false; 
    }
    else
     return true;
  }


  /********** On Submit Login Form ***********/
  const onLogin = (e) => {  
    e.preventDefault();
    console.log(checkValidation())
    if(checkValidation()){
      console.log("ssd")
        //if(validateCaptcha()){
          const payload = {
            email: form.username.value,
            password: form.password.value,
          };
          ApiService.login(payload)
          .then((res) => {
             console.log(res)
          })
          .catch((err) => {
          });
       // }
    }
  } 

  useEffect(() => {
     console.log(form)
  },[form])

  useEffect(() => {
    setloginSlide("true");
    setTimeout(() => {
      loadCaptchaEnginge(4, "white", "black", "numbers");
    }, 10);
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
