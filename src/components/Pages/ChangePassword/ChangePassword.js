import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.css";
import loginImgBanner from "../../../assets/images/login-banner.png";
import ApiService from "../../../services/ApiService";
import { AuthContext } from "../../../context/AuthContextProvider";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginSlide, setloginSlide] = useState("true");
  const [newPassword, setnewPassword] = useState("password");
  const [confirmPassword, setconfirmPassword] = useState("password");
  const [yourPassword, setyourPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [responseErrorshow, setResponseError] = useState(false);
  const [reponseErrorMessage, setResponseErrorMessage] = useState("");
  const auth = useContext(AuthContext);
  const defaultValues = {
    old_password: {
      value: "",
      error: false,
      errorMessage: "",
      showPassword: false,
    },
    new_password: {
      value: "",
      error: false,
      errorMessage: "",
      showPassword: false,
    },
    confirm_password: {
      value: "",
      error: false,
      errorMessage: "",
      showPassword: false,
    },
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        error: false,
        value,
      },
    });
  };

  const handleShowPassword = (name) => {
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        showPassword: !formValues[name].showPassword,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formValues.old_password.value ||
      !formValues.new_password.value ||
      !formValues.confirm_password.value ||
      formValues.new_password.value !== formValues.confirm_password.value
    ) {
      setFormValues({
        ...formValues,
        old_password: {
          ...formValues["old_password"],
          errorMessage: !formValues.old_password.value
            ? "Please Enter Old Password!"
            : "",
          error: !formValues.old_password.value ? true : false,
        },
        new_password: {
          ...formValues["new_password"],
          errorMessage: !formValues.new_password.value
            ? "Please Enter New Password!"
            : "",
          error: !formValues.new_password.value ? true : false,
        },
        confirm_password: {
          ...formValues["confirm_password"],
          errorMessage: !formValues.confirm_password.value
            ? "Please confirm your Password!"
            : formValues.new_password.value !==
              formValues.confirm_password.value
            ? "Confirm Password not matched!"
            : "",
          error:
            !formValues.confirm_password.value ||
            formValues.new_password.value !== formValues.confirm_password.value
              ? true
              : false,
        },
      });
    } else {
      setLoading(true);
      const payload = {
        email: auth.auth.user.email,
        password: formValues.old_password.value,
        new_password: formValues.new_password.value,
        confirm_password: formValues.confirm_password.value,
      };
      ApiService.changePassword(payload)
        .then((res) => {
          setLoading(false);
          if (res.status === 200 || res.status === 201) {
            auth.setAuth({
              ...auth.auth,
              showSucessMessage: true,
              successMessage: "Password Updated Successfully!",
            });
            setResponseError(false);
          } else {
            setResponseError(true);
            setResponseErrorMessage("Invalid Old Password");
          }
        })
        .catch((err) => {
          setLoading(false);
          setResponseError(true);
          setResponseErrorMessage(err?.response?.data?.message);
        });
    }
  };

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

  useEffect(() => {
    setloginSlide("true");
  }, [location.state.login]);

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
          <form
            className={`${styles.loginFormBox} col-12 d-inline-flex flex-column`}
            onSubmit={handleSubmit}
          >
            <div
              className={`${styles.loginFormRow} col-12 d-inline-block position-relative`}
            >
              <input
                id="new_password"
                name="new_password"
                autoComplete="off"
                type={newPassword}
                placeholder="New Password"
                className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
              />
              <label
                htmlFor="new_password"
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
                id="confirm_password"
                name="confirm_password"
                autoComplete="off"
                type={confirmPassword}
                placeholder="New Password Confirm"
                className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
              />
              <label
                htmlFor="confirm_password"
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
                id="old_password"
                name="old_password"
                autoComplete="off"
                type={yourPassword}
                placeholder="Your Password"
                className={`col-12 position-relative d-inline-block ${styles.loginFormField}`}
              />
              <label
                htmlFor="old_password"
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
          </form>
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
