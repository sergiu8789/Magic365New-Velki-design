import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Aside.module.css";
import ApiService from "../../../services/ApiService";
import { useAuth } from "../../../context/AuthContextProvider";
import { AsideList } from "../../../data/AsideList";

function Aside({ openAside, setopenAside }) {
  const [totalCount, setTotalCount] = useState(0);
  const auth = useAuth();
  const navigate = useNavigate();

  const OpenCurrentBet = (link) => {
    if (link) {
      navigate("/" + link);
    } else {
      navigate("/");
    }
    setopenAside(false);
  };

  const handleLogout = () => {
    auth.setAuth({
      ...auth.auth,
      loggedIn: false,
      showSucessMessage: true,
      successMessage: "Logout Successfully!",
    });
    localStorage.removeItem("bettoken");
    navigate("/");
    setopenAside(false);
  };

  useEffect(() => {
    if (auth.auth.loggedIn) {
      ApiService.currentBets(1, "", "")
        .then((res) => {
          setTotalCount(res.data.count);
        })
        .catch((err) => {
          setTotalCount(0);
          if (
            err?.response?.data?.statusCode === 401 &&
            err?.response?.data?.message === "Unauthorized"
          ) {
            localStorage.removeItem("token");
            auth.setAuth({
              ...auth.auth,
              loggedIn: false,
              user: {},
              showSessionExpire: true,
            });
          }
        });
    }
  }, [openAside]);

  return (
    <React.Fragment>
      <div
        className={`position-fixed m-auto col-12 h-100 d-inline-block ${
          styles.asideContainer
        } ${openAside ? styles.asideContainerShow : styles.asideContainerHide}`}
      >
        <div
          className={`${styles.asideDrawer} position-relative h-100 d-inline-block`}
        >
          <div
            className={`${styles.headerRow} d-inline-flex align-items-center justify-content-between col-12`}
          >
            <span className={styles.asideTitle}>Menu</span>
            <span
              className={`${styles.asideClose} d-inline-flex align-items-center justify-content-center`}
              onClick={() => setopenAside(false)}
              role="button"
            >
              <i className="icon-close"></i>
            </span>
          </div>
          <div
            className={`${styles.categoryMenuBox} d-inline-block overflow-hidden col-12`}
          >
            {AsideList.map((item, index) => (
              <div
                className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
                onClick={() => OpenCurrentBet(item.link)}
                key={index}
                role="button"
              >
                <span className={`icon ${item.icon}`}></span>
                <span className={styles.itemLinkName}>{item.name}</span>
                {item.name === "Current Bets" && (
                  <span
                    className={`${styles.curentBetCount} d-inline-flex align-items-center justify-content-center`}
                  >
                    {totalCount}
                  </span>
                )}
                <span
                  className={`${styles.itemArrow} position-absolute icon-arrow-left`}
                ></span>
              </div>
            ))}
          </div>
          <div
            className={`${styles.categoryMenuBox} d-none overflow-hidden col-12`}
          >
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
            >
              <span className="icon icon-transfer"></span>
              <span className={styles.itemLinkName}>P2P Transfer</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
            >
              <span className="icon icon-transfer-log"></span>
              <span className={styles.itemLinkName}>P2P Transfer log</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
          </div>
          <div
            className={`${styles.categoryMenuBox} d-inline-block overflow-hidden col-12`}
          >
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={() => OpenCurrentBet("setting")}
              role="button"
            >
              <span className="icon icon-setting"></span>
              <span className={styles.itemLinkName}>Setting</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
          </div>
          <div
            onClick={() => handleLogout()}
            className={`${styles.categoryMenuBox} d-inline-block overflow-hidden col-12`}
            role="button"
          >
            <div
              className={`${styles.linkItemRow} ${styles.LogoutlinkItemRow} d-inline-flex align-items-center col-12 position-relative`}
            >
              <span className="icon icon-logout"></span>
              <span className={styles.itemLinkName}>Logout</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
          </div>
          <div
            className={`${styles.timeZone} d-flex justify-content-center align-items-start`}
          >
            <i className="icon-sphere mt-1"></i>
            <p className={`${styles.timeZoneTime} d-inline-flex`}>
              Time Zone：GMT+6:00
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Aside;
