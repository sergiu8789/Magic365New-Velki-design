import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MenuHeader.module.css";

export const MenuHeader = ({ title }) => {
  const navigate = useNavigate();

  const goBackPage = () => {
    navigate(-1);
  };
  return (
    <React.Fragment>
      <div
        className={`${styles.menuHeaderName} col-12 d-inline-flex position-relative align-items-center justify-content-center`}
      >
        <i
          className={`${styles.gameOpenArrow} position-absolute icon-arrow-down`}
          onClick={goBackPage}
        ></i>
        <label className={`${styles.HeaderName} d-inline-flex`}>
          {title}
        </label>
      </div>
    </React.Fragment>
  );
};
