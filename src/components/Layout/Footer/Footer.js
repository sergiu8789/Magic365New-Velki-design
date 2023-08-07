import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MyBets } from "../MyBets/MyBets";
import styles from "./Footer.module.css";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [openMyBets, setopenMyBets] = useState("");

  useEffect(() => {
    if (document.querySelector("." + styles.activeTabLink)) {
      document.querySelector("." + styles.activeTabLink).click();
    }
  }, [location?.pathname]);

  const navigatePage = (event, link, type, click) => {
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
    let inplay = 20;
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    setTimeout(function () {
      if (type === "link") {
        navigate(link);
        setTabPosLeft(TabPos);
      } else if (type === "click" && click === "bets") {
        let LoginRand = Math.floor(Math.random() * 100000) + 1;
        setopenMyBets(LoginRand);
      }
    }, 200);
  };

  const FooterObj = [
    {
      name: "Home",
      icon: "icon-home",
      link: "/",
      type: "link",
      click: "",
    },
    {
      name: "Casino",
      icon: "icon-poker",
      link: "/",
      type: "link",
      click: "",
    },
    {
      name: "Sports",
      icon: "icon-sport",
      link: "/sports",
      type: "link",
      click: "",
    },
    {
      name: "Leagues",
      icon: "icon-trophy",
      link: "/leagues",
      type: "link",
      click: "",
    },
    {
      name: "My Bets",
      icon: "icon-list",
      link: "/",
      type: "click",
      click: "bets",
    },
  ];

  return (
    <React.Fragment>
      <div
        className={`${styles.siteFooterRow} d-inline-flex align-items-center justify-content-between col-12 position-fixed m-auto`}
      >
        {FooterObj.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className={`${
                  styles.homeTabBox
                } d-inline-flex align-items-center justify-content-center flex-column posiution-relative ${
                  location.pathname === item.link && styles.activeTabLink
                }`}
                onClick={(event) =>
                  navigatePage(event, item.link, item.type, item.click)
                }
              >
                <i className={`${styles.homeTabIcon} ${item.icon}`}></i>
                <span className={styles.homeTabName}>{item.name}</span>
              </div>
            </React.Fragment>
          );
        })}
        <div
          className={`${styles.footerTabHighlight} d-inline-block position-absolute`}
          style={{ transform: "translateX(" + TabPosLeft + "px)" }}
        ></div>
      </div>
      {openMyBets && <MyBets openMyBets={openMyBets} />}
    </React.Fragment>
  );
}

export default Footer;
