import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Aside.module.css";

function Aside({ openAside, setopenAside }) {
  const [showAside, setshowAside] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (openAside) {
      setshowAside(openAside);
    }
  }, [openAside]);

  const CloseAsideMenu = () => {
    setopenAside("false");
  };

  const OpenCurrentBet = (link) => {
    if (link) {
      navigate("/" + link);
    } else {
      navigate("/");
    }
    setopenAside("false");
  };

  const appUserLogout = () => {};
  return (
    <React.Fragment>
      <div
        className={`position-absolute m-auto col-12 h-100 d-inline-block ${
          styles.asideContainer
        } ${
          showAside === "true"
            ? styles.asideContainerShow
            : styles.asideContainerHide
        }`}
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
              onClick={() => CloseAsideMenu()}
            >
              <i className="icon-close"></i>
            </span>
          </div>
          <div
            className={`${styles.categoryMenuBox} d-inline-block overflow-hidden col-12`}
          >
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={() => OpenCurrentBet("")}
            >
              <span className="icon icon-home"></span>
              <span className={styles.itemLinkName}>Home</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={() => OpenCurrentBet("menu/upline-whatsapp-number")}
            >
              <span className="icon icon-whatsapp-line"></span>
              <span className={styles.itemLinkName}>
                Upline WhatsApp Number
              </span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={() => OpenCurrentBet("menu/balance-overview")}
            >
              <span className="icon icon-wallet"></span>
              <span className={styles.itemLinkName}>Balance Overview</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={() => OpenCurrentBet("menu/current-bets")}
            >
              <span className="icon icon-list"></span>
              <span className={styles.itemLinkName}>Current Bets</span>
              <span
                className={`${styles.curentBetCount} d-inline-flex align-items-center justify-content-center`}
              >
                0
              </span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={() => OpenCurrentBet("menu/bets-history")}
            >
              <span className="icon icon-history"></span>
              <span className={styles.itemLinkName}>Bets History</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={() => OpenCurrentBet("menu/profit-and-loss")}
            >
              <span className="icon icon-profit-loss"></span>
              <span className={styles.itemLinkName}>Profit & Loss</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={() => OpenCurrentBet("menu/active-log")}
            >
              <span className="icon icon-active-log"></span>
              <span className={styles.itemLinkName}>Active Log</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
            <div
              className={`${styles.linkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={() => OpenCurrentBet("menu/my-profile")}
            >
              <span className="icon icon-profile"></span>
              <span className={styles.itemLinkName}>My Profile</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
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
              onClick={() => OpenCurrentBet("menu/setting")}
            >
              <span className="icon icon-setting"></span>
              <span className={styles.itemLinkName}>Setting</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
          </div>
          <div
            className={`${styles.categoryMenuBox} d-inline-block overflow-hidden col-12`}
          >
            <div
              className={`${styles.linkItemRow} ${styles.LogoutlinkItemRow} d-inline-flex align-items-center col-12 position-relative`}
              onClick={appUserLogout}
            >
              <span className="icon icon-logout"></span>
              <span className={styles.itemLinkName}>Logout</span>
              <span
                className={`${styles.itemArrow} position-absolute icon-arrow-left`}
              ></span>
            </div>
          </div>
          <div
            className={`${styles.timeZone} d-flex justify-content-center align-items-center`}
          >
            <i className="icon-sphere w-5 text-16"></i>
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
