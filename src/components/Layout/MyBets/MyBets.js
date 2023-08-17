import React, { useEffect, useRef, useState } from "react";
import styles from "./MyBets.module.css";
import { NoData } from "../NoData/NoData";
import ApiService from "../../../services/ApiService";
import { useAuth } from "../../../context/AuthContextProvider";
import { useBet } from "../../../context/BetContextProvider";
import { useApp } from "../../../context/AppContextProvider";
import {
  matchDate,
  formatTime,
  getCasinoMarketName,
} from "../../../utils/helper";

export const MyBets = ({ openMyBets }) => {
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [betWindow, setbetWindow] = useState("Exchange");
  const [headerBet, setheaderBet] = useState(false);
  const [lastActive, setlastActive] = useState("Exchange");
  const tabRef = useRef();
  const auth = useAuth();
  const betData = useBet();
  const appData = useApp();
  const [betsList, setBetList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const [matchListCount, setMatchListCount] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState("");

  const activeBetTab = (event, name) => {
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
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

  const showBetDetail = (
    item,
    team_one,
    team_two,
    market_type,
    market_name
  ) => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    let Title_type = "",
      title_market = "",
      TitleName = "";
    TitleName = team_one;
    if (team_two) {
      TitleName = TitleName + " v " + team_two;
    }
    if (market_type) {
      Title_type =
        '<div class="' +
        styles.triangleArrow +
        ' icon-triangle-black-300 d-inline-block align-baseline"></div><span class="' +
        styles.eventName +
        ' text-capitalize">' +
        market_type +
        "</span>";
    }
    if (market_name) {
      title_market =
        '<div class="' +
        styles.triangleArrow +
        ' icon-triangle-black-300 d-inline-block align-baseline"></div><span class="' +
        styles.eventName +
        ' text-capitalize">' +
        market_name +
        "</span>";
    }
    let createElem =
      '<div class="' +
      styles.eventMarketName +
      ' d-flex align-items-center"><span class="' +
      styles.teamName +
      '">' +
      TitleName +
      "</span>" +
      Title_type +
      title_market +
      "</div>";

    document.getElementById("betHeaderTitle").innerHTML = createElem;
    setheaderBet(true);
    setbetWindow("betDetail");
    setBetList([]);
    ApiService.fetchAllBets(
      item.match_id ? item.match_id : "casino",
      item.market_id,
      item.market_type,
      item.market_name ? item.market_name : null
    ).then((res) => {
      if (res?.data?.rows) {
        setBetList(res.data.rows);
        appData.setAppData({ ...appData.appData, listLoading: false });
      } else {
        appData.setAppData({ ...appData.appData, listLoading: false });
      }
    });
  };

  const betDetailList = () => {
    setheaderBet(false);
    document.getElementById("betHeaderTitle").innerHTML = "My Bets";
    setbetWindow(lastActive);
    if (tabRef && tabRef.current) {
      tabRef.current.click();
    }
  };

  useEffect(() => {
    if (auth.auth.loggedIn) {
      ApiService.getUserBetMatches()
        .then((res) => {
          appData.setAppData({ ...appData.appData, listLoading: false });
          if (res?.data?.rows) {
            setMatchListCount(res.data.count);
            setMatchList(res.data.rows);
            betData.setBetData({
              ...betData.betData,
              userMatchBets: res.data.rows,
            });
          } else {
            setMatchListCount(0);
          }
        })
        .catch((err) => {
          appData.setAppData({ ...appData.appData, listLoading: false });
          setMatchListCount(0);
          if (
            err?.response?.data?.statusCode === 401 &&
            err?.response?.data?.message === "Unauthorized"
          ) {
            localStorage.removeItem("token");
            auth.setAuth({
              ...auth.auth,
              isloggedIn: false,
              user: {},
              showSessionExpire: true,
            });
          }
        });
    }
  }, [betData.betData.betsLoading, auth.auth.loggedIn]);

  useEffect(() => {
    if (betData.betData.betsList?.length) setBetList(betData.betData.betsList);
  }, [betData.betData.betsList]);

  useEffect(() => {
    if (tabRef && tabRef.current) {
      tabRef.current.click();
    }
  }, []);

  useEffect(() => {
    document
      .querySelector("." + styles.myBetsWindowLayer)
      .classList.add(styles.open);
    document.getElementById("betHeaderTitle").innerHTML = "My Bets";
    setbetWindow("Exchange");
    setheaderBet(false);
    if (tabRef && tabRef.current) {
      tabRef.current.click();
    }
    appData.setAppData({ ...appData.appData, listLoading: true });
  }, [openMyBets]);

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
              headerBet && styles.betHeaderDetail
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
              {headerBet === false ? (
                <React.Fragment>
                  <div
                    ref={tabRef}
                    className={`${styles.myBetTab} position-relative d-inline-flex align-items-center`}
                    onClick={(event) => activeBetTab(event, "Exchange")}
                  >
                    Exchange{" "}
                    <span className={`${styles.myBetCount}`}>
                      {matchList?.length}
                    </span>
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
              {headerBet === false && (
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
              {matchListCount === 0 && <NoData title="No Bets" />}
              {matchList.map((item, index) => (
                <div
                  className={`${styles.singleBetRow} col-12 d-flex align-items-center position-relative`}
                  onClick={() => {
                    showBetDetail(
                      item,
                      item?.team_one,
                      item?.team_two,
                      item?.market_type?.replace("_", " "),
                      item?.market_name
                    );
                    setSelectedMatch(item);
                  }}
                  key={index}
                >
                  {/* <div
                    className={`${styles.Betcount} flex-shrink-0 d-flex align-items-center justify-content-center`}
                  >
                    1
                  </div> */}
                  <div
                    className={`${styles.eventMarketName} d-flex align-items-center`}
                  >
                    <span className={styles.teamName}>
                      {item?.team_one}{" "}
                      {item?.team_two ? " v " + item.team_two : ""}
                    </span>
                    {item?.market_type && (
                      <React.Fragment>
                        <div
                          className={`${styles.triangleArrow} icon-triangle-black-300 d-inline-block align-baseline`}
                        ></div>
                        <span className={`${styles.eventName} text-capitalize`}>
                          {item?.market_type?.replace("_", " ")}
                        </span>
                      </React.Fragment>
                    )}
                    {item?.market_name && (
                      <React.Fragment>
                        <div
                          className={`${styles.triangleArrow} icon-triangle-black-300 d-inline-block align-baseline`}
                        ></div>
                        <span className={`${styles.eventName} text-capitalize`}>
                          {getCasinoMarketName(item?.market_name)}
                        </span>
                      </React.Fragment>
                    )}
                  </div>
                  <div
                    className={`${styles.nextLayer} icon-arrow-left position-absolute d-flex align-items-center justify-content-center`}
                  ></div>
                </div>
              ))}
            </div>
            <div
              className={`${styles.allBetsList} ${
                betWindow === "Parlay"
                  ? `${styles.slideInRight} d-inline-block`
                  : `${styles.slideOutRight} d-none`
              } col-12 d-inline-block`}
              id="ParalayBetsList"
            >
              <NoData title="No Bets" />
            </div>
            <div
              className={`${styles.allBetsList} ${styles.BetDetailList} ${
                betWindow === "betDetail"
                  ? `${styles.slideInRight} d-inline-flex`
                  : `${styles.slideOutRight} d-none`
              } col-12 flex-column`}
              id="BetDetailList"
            >
              {betsList.map((item, index) => (
                <div
                  className={`${styles.betDetail} overflow-hidden col-12 d-inline-block`}
                  key={index}
                >
                  <div
                    className={`${styles.betSlipHeader} col-12 d-flex align-items-center`}
                  >
                    <span
                      className={`${styles.betTag} ${
                        item.type === 1
                          ? styles.OddbackTag
                          : item.type === 2
                          ? styles.OddLayTag
                          : ""
                      } position-relative d-inline-flex align-items-center`}
                    >
                      {item.type === 1 ? "Back" : item.type === 2 ? "Lay" : ""}
                    </span>
                    <span className={`${styles.betTeamName} d-inline-block`}>
                      {item.selection_name}{" "}
                      {item.market_type === "fancy"
                        ? " - (" + item.size + ")"
                        : ""}
                    </span>
                  </div>
                  <div
                    className={`${styles.balanceInfoBOx} col-12 d-inline-flex`}
                  >
                    <div
                      className={`${styles.balanceRecord} d-inline-flex flex-column`}
                    >
                      <label className={styles.balanceInfoTxt}>
                        {item.type === 1
                          ? selectedMatch?.market_type === "fancy"
                            ? "Runs/Odds"
                            : "Odds"
                          : item.type === 2
                          ? "Odds"
                          : ""}
                      </label>
                      <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                        {item.type === 1
                          ? item.market_type !== "fancy" &&
                            item.market_type !== "bookmaker" &&
                            item.market_name !== "teen"
                            ? parseFloat(item.odds).toFixed(2)
                            : item.market_type === "fancy"
                            ? `${item.size}/${parseFloat(item.odds)}`
                            : parseFloat(item.odds / 100 + 1)?.toFixed(2)
                          : item.type === 2
                          ? item.market_type !== "fancy" &&
                            item.market_type !== "bookmaker" &&
                            item.market_name !== "teen"
                            ? parseFloat(item.odds).toFixed(2)
                            : parseFloat(item.odds / 100 + 1).toFixed(2)
                          : ""}
                      </div>
                    </div>
                    <div
                      className={`${styles.balanceRecord} d-inline-flex flex-column`}
                    >
                      <label className={styles.balanceInfoTxt}>Stake</label>
                      <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                        {item.amount}
                      </div>
                    </div>
                    <div
                      className={`${styles.balanceRecord} d-inline-flex flex-column`}
                    >
                      <label className={styles.balanceInfoTxt}>
                        {item.type === 1
                          ? "Matched (PBU)"
                          : item.type === 2
                          ? "Liability"
                          : ""}
                      </label>
                      <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                        {item.type === 1
                          ? item.market_type !== "fancy" &&
                            item.market_type !== "bookmaker" &&
                            item.market_name !== "teen"
                            ? parseFloat(
                                item.odds * item.amount - item.amount
                              ).toFixed(2)
                            : parseFloat(
                                (item.odds / 100 + 1) * item.amount -
                                  item.amount
                              ).toFixed(2)
                          : item.type === 2
                          ? item.market_type !== "fancy" &&
                            item.market_type !== "bookmaker" &&
                            item.market_name !== "teen"
                            ? parseFloat(
                                item.odds * item.amount - item.amount
                              ).toFixed(2)
                            : parseFloat(
                                (item.odds / 100 + 1) * item.amount -
                                  item.amount
                              ).toFixed(2)
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.betRefrIDRow} col-12 d-inline-flex align-items-center justify-content-between`}
                  >
                    <span className={styles.refIdTxt}>Ref: {item.bet_id}</span>
                    <span className={styles.refIdTxt}>
                      {matchDate(item.createdAt)} {formatTime(item.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
