import React, { useEffect, useRef, useState } from "react";
import styles from "./MyBets.module.css";

export const MyBets = ({ openMyBets }) => {
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [betWindow, setbetWindow] = useState("Exchange");
  const [headerBet, setheaderBet] = useState("false");
  const [lastActive, setlastActive] = useState("Exchange");
  const tabRef = useRef();

  useEffect(() => {
    document
      .querySelector("." + styles.myBetsWindowLayer)
      .classList.add(styles.open);
    document.getElementById("betHeaderTitle").innerHTML = "My Bets";
    setbetWindow("Exchange");
    setheaderBet("false");
    if (tabRef && tabRef.current) {
      tabRef.current.click();
    }
  }, [openMyBets]);

  const activeBetTab = (event, name) => {
    let pageOffset = document.querySelector(".center-mobile-mode").offsetLeft;
    let inplay = 15;
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    let widthTab = event.currentTarget.getBoundingClientRect().width;
    setTabLineWidth(widthTab);
    setTabPosLeft(TabPos);
    if (name) {
      setbetWindow(name);
      setlastActive(name);
    }
  };

  const hideBetLayer = () => {
    document
      .querySelector("." + styles.myBetsWindowLayer)
      .classList.remove(styles.open);
  };

  const showBetDetail = () => {
    let betName = document.querySelector(
      "#betDetailRow_one ." + styles.eventMarketName
    ).innerHTML;
    document.getElementById("betHeaderTitle").innerHTML = betName;
    setheaderBet("true");
    setbetWindow("betDetail");
  };

  const betDetailList = () => {
    setheaderBet("false");
    document.getElementById("betHeaderTitle").innerHTML = "My Bets";
    setbetWindow(lastActive);
    if (tabRef && tabRef.current) {
      tabRef.current.click();
    }
  };

  useEffect(() => {
    if (tabRef && tabRef.current) {
      tabRef.current.click();
    }
  }, []);

  return (
    <React.Fragment>
      <div
        className={`${styles.myBetsWindowLayer} col-12 d-inline-block m-auto position-fixed h-100`}
      >
        <div
          className={`${styles.myBetContent} position-absolute col-12 d-inline-block`}
        >
          <div
            className={`${styles.MyBetHeader} ${
              headerBet === "true" && styles.betHeaderDetail
            } col-12 d-inline-block position-relative`}
          >
            <div
              className={`${styles.MyBetHeaderRow} col-12 position-relative d-inline-flex align-items-center justify-content-center position-relative`}
            >
              <div
                className={`${styles.betDetailBack} icon-arrow-left position-absolute align-items-center justify-content-center`}
                onClick={betDetailList}
              ></div>
              <div
                className={`${styles.myBetTitle} d-inline-flex align-items-center`}
                id="betHeaderTitle"
              >
                My Bets
              </div>
              <span
                className={`${styles.myBetLayerClose} icon-close position-absolute d-flex justify-content-center align-items-center`}
                onClick={hideBetLayer}
              ></span>
            </div>
            <div
              className={`${styles.myBetTabsBox} position-relative col-12 d-inline-flex align-items-center justify-content-center`}
            >
              {headerBet === "false" ? (
                <React.Fragment>
                  <div
                    ref={tabRef}
                    className={`${styles.myBetTab} position-relative d-inline-flex align-items-center`}
                    onClick={(event) => activeBetTab(event, "Exchange")}
                  >
                    Exchange <span className={`${styles.myBetCount}`}>0</span>
                  </div>
                  <div
                    className={`${styles.myBetTab} position-relative d-inline-flex align-items-center`}
                    onClick={(event) => activeBetTab(event, "Parlay")}
                  >
                    Parlay <span className={`${styles.myBetCount}`}>0</span>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div
                    className={`${styles.myBetTab} position-relative d-inline-flex align-items-center`}
                  >
                    Matched <span className={`${styles.myBetCount}`}>0</span>
                  </div>
                  <div
                    className={`${styles.activeMatchLine} position-absolute d-inline-block`}
                  >
                    1
                  </div>
                </React.Fragment>
              )}
              {headerBet === "false" && (
                <div
                  className={`${styles.activeLine} position-absolute d-inline-block`}
                  style={{
                    width: TabLineWidth + "px",
                    transform: "translateX(" + TabPosLeft + "px)",
                  }}
                ></div>
              )}
            </div>
          </div>
          <div
            className={`${styles.allBetContainerList} col-12 d-inline-block overflow-hidden`}
          >
            <div
              className={`${styles.allBetsList} ${
                betWindow === "Exchange"
                  ? `${styles.slideInLeft} d-inline-block`
                  : `${styles.slideOutLeft} d-none`
              } col-12`}
              id="ExchangeBetsList"
            >
              <div
                className={`${styles.singleBetRow} col-12 d-flex align-items-center position-relative`}
                id="betDetailRow_one"
                onClick={showBetDetail}
              >
                <div
                  className={`${styles.Betcount} flex-shrink-0 d-flex align-items-center justify-content-center`}
                >
                  1
                </div>
                <div
                  className={`${styles.eventMarketName} d-flex align-items-center`}
                >
                  <span className={styles.teamName}>England v Australia</span>
                  <div
                    className={`${styles.triangleArrow} icon-triangle-black-300 d-inline-block align-baseline`}
                  ></div>
                  <span className={styles.eventName}>Match Odds</span>
                </div>
                <div
                  className={`${styles.nextLayer} icon-arrow-left position-absolute d-flex align-items-center justify-content-center`}
                ></div>
              </div>
            </div>
            <div
              className={`${styles.allBetsList} ${
                betWindow === "Parlay"
                  ? `${styles.slideInRight} d-inline-block`
                  : `${styles.slideOutRight} d-none`
              } col-12 d-inline-block`}
              id="ParalayBetsList"
            ></div>
            <div
              className={`${styles.allBetsList} ${styles.BetDetailList} ${
                betWindow === "betDetail"
                  ? `${styles.slideInRight} d-inline-block`
                  : `${styles.slideOutRight} d-none`
              } col-12 d-inline-block`}
              id="BetDetailList"
            >
              <div
                className={`${styles.betDetail} overflow-hidden col-12 d-inline-block`}
              >
                <div
                  className={`${styles.betSlipHeader} col-12 d-flex align-items-center`}
                >
                  <span
                    className={`${styles.betTag} ${styles.OddbackTag} position-relative d-inline-flex align-items-center`}
                  >
                    Back
                  </span>
                  <span className={`${styles.betTeamName} d-inline-block`}>
                    England
                  </span>
                </div>
                <div
                  className={`${styles.balanceInfoBOx} col-12 d-inline-flex`}
                >
                  <div
                    className={`${styles.balanceRecord} d-inline-flex flex-column`}
                  >
                    <label className={styles.balanceInfoTxt}>Odds req.</label>
                    <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                      6.00
                    </div>
                  </div>
                  <div
                    className={`${styles.balanceRecord} d-inline-flex flex-column`}
                  >
                    <label className={styles.balanceInfoTxt}>Avg. Odds</label>
                    <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                      6.00
                    </div>
                  </div>
                  <div
                    className={`${styles.balanceRecord} d-inline-flex flex-column`}
                  >
                    <label className={styles.balanceInfoTxt}>
                      Matched (PBU)
                    </label>
                    <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                      1.00
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.betRefrIDRow} col-12 d-inline-flex align-items-center justify-content-between`}
                >
                  <span className={styles.refIdTxt}>Ref: 1118955402</span>
                  <span className={styles.refIdTxt}>01-08-2023 14:45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
