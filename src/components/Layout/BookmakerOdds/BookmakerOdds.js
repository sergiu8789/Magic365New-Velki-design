import React, { useState, useRef, useEffect } from "react";
import styles from "../MatchOdds/MatchOdds.module.css";
import { useBet } from "../../../context/BetContextProvider";
import { useExposure } from "../../../context/ExposureContextProvider";

export const BookmakerOdds = ({ oddsList, matchId, betList }) => {
  const betData = useBet();
  const expoData = useExposure();
  const [hideBookMarker, sethideBookMarker] = useState("false");
  const [bookMarkerOdds, setBookMarkerOdds] = useState();
  const prevCountRef = useRef(bookMarkerOdds);
  const [allSelections, setAllSelections] = useState([]);

  const hideBookMarkerOdd = () => {
    if (hideBookMarker === "true") {
      sethideBookMarker("false");
    } else {
      sethideBookMarker("true");
    }
  };

  const placeBet = (item, type, event) => {
    const betSelection = {
      amount: "",
      type: type,
      size: type === 1 ? item?.bs1 : item?.ls1,
      odds: type === 1 ? item?.b1 : item?.l1,
      selection: item.nat,
      runner_name: item.nat,
      selection_id: item.sid,
      market_id: item.mid,
      match_id: matchId,
      market_name: "",
      status: item.s,
      market_type: "bookmaker",
    };
    betData.setBetData({
      ...betData.betData,
      betSlipStatus: true,
      betSelection: betSelection,
    });
    let cuurentElem = event.currentTarget;
    setTimeout(function () {
      cuurentElem.scrollIntoView({
        behavior: "smooth",
        top: 50,
      });
    }, 300);
  };

  useEffect(() => {
    let allRunners = [];
    let selections = [];
    oddsList?.bm1?.map((item) => {
      let gameName = {
        Back: item?.b1,
        BackSize: item?.bs1,
        Lay: item?.l1,
        LaySize: item?.ls1,
      };
      allRunners.push(gameName);
      if (betData?.betData?.betSelection?.selection_id === item.sid) {
        if (
          betData?.betData?.betSelection?.type === 1 &&
          betData?.betData?.betSelection?.odds !== item.b1
        )
          betData.setBetData({
            ...betData.betData,
            betSelection: { ...betData.betData.betSelection, odds: item.b1 },
          });
        if (
          betData?.betData?.betSelection?.type === 2 &&
          betData?.betData?.betSelection?.odds !== item.l1
        )
          betData.setBetData({
            ...betData.betData,
            betSelection: { ...betData.betData.betSelection, odds: item.l1 },
          });
        if (betData?.betData?.betSelection?.status !== item.s)
          betData.setBetData({
            ...betData.betData,
            betSelection: { ...betData.betData.betSelection, status: item.s },
          });
      }
      selections.push(item.sid);
    });
    setAllSelections((previousState) => {
      if (previousState?.join() !== selections?.join()) return selections;
      else return previousState;
    });
    setBookMarkerOdds(allRunners);
    prevCountRef.current = bookMarkerOdds;
  }, [oddsList]);

  useEffect(() => {
    let exposure = {};
    allSelections.map((item) => {
      exposure[item] = "";
    });
    if (betList.length) {
      const filteredBets = betList?.filter(
        (item) => item.market_type === "bookmaker"
      );
      filteredBets?.map((item) => {
        allSelections?.map((selection) => {
          if (item?.selection_id === selection) {
            if (item.type === 1)
              exposure[selection] =
                (exposure[selection] ? exposure[selection]: 0) +
                (parseFloat(item.amount) * (parseFloat(item.odds) / 100 + 1) -
                  parseFloat(item.amount));
            else
              exposure[selection] =
              (exposure[selection] ? exposure[selection]: 0) - parseFloat(item.amount);
          } else {
            if (item.type === 1)
              exposure[selection] =
              (exposure[selection] ? exposure[selection]: 0) - parseFloat(item.amount);
            else
              exposure[selection] =
              (exposure[selection] ? exposure[selection]: 0) +
                (parseFloat(item.amount) * (parseFloat(item.odds) / 100 + 1) -
                  parseFloat(item.amount));
          }
        });
      });
    }
    console.log(expoData.bookmakerExpoData.oldExpoData,exposure);
    expoData.setBookmakerExpoData({
      oldExpoData: exposure,
    });

  }, [betList, allSelections]);

  useEffect(() => {
    if(betData.betData.betSelection.market_type === 'bookmaker'){
      if(betData.betData.betSelection.amount){
        if (expoData?.bookmakerExpoData?.oldExpoData) {
      let updated = {};
      let betSelection = betData?.betData?.betSelection;
      Object.keys(expoData?.bookmakerExpoData?.oldExpoData)?.map((item) => {
        if (betSelection?.selection_id?.toString() === item) {
          if (betSelection?.type === 1)
            updated[item] =
              expoData?.bookmakerExpoData?.oldExpoData[item] +
              (betSelection?.amount !== ""
                ? (parseFloat(betSelection?.odds) / 100 + 1) *
                    parseFloat(betSelection?.amount) -
                  parseFloat(betSelection?.amount)
                : 0);
          else
            updated[item] =
              expoData?.bookmakerExpoData?.oldExpoData[item] -
              (betSelection?.amount !== ""
                ? (parseFloat(betSelection?.odds) / 100 + 1) *
                    parseFloat(betSelection?.amount) -
                  parseFloat(betSelection?.amount)
                : 0);
        } else {
          if (betSelection?.type === 1)
            updated[item] =
              expoData?.bookmakerExpoData?.oldExpoData[item] -
              (betSelection?.amount !== ""
                ? parseFloat(betSelection?.amount)
                : 0);
          else
            updated[item] =
              expoData?.bookmakerExpoData?.oldExpoData[item] +
              (betSelection?.amount !== ""
                ? parseFloat(betSelection?.amount)
                : 0);
        }
      });
          expoData.setBookmakerExpoData({
          ...expoData.bookmakerExpoData,
          updatedExpo: updated,
          showUpdate : true
         });
        }
      }
      else{
        expoData.setBookmakerExpoData({
          ...expoData.bookmakerExpoData,
          updatedExpo: {},
          showUpdate : false
         });
      }
    }
  }, [betData.betData.betSelection.amount]);

  return (
    <div
      className={`${styles.bookmarkerOddsBox} overflow-hidden col-12 d-inline-block`}
    >
      <div
        className={`${styles.BookmarkerTitleRow} ${
          hideBookMarker === "true" && styles.BookmarkerTitleRound
        } d-inline-flex align-items-center position-relative col-12`}
      >
        <div className={`d-inline-flex align-items-center`}>
          <i className="icon-star"></i>
          <label className={styles.matchOddTitle}>Bookmaker</label>
        </div>
        <i
          className={`${styles.gameOpenArrow} position-absolute icon-arrow-down`}
          onClick={hideBookMarkerOdd}
        ></i>
      </div>
      <div
        className={`${styles.bookMarkerOddContainer} ${
          hideBookMarker === "true" && styles.hidebookMarkerOdd
        } col-12`}
      >
        <div className="col-12 d-inline-flex justify-content-end">
          <div className="col-4 d-inline-flex align-items-center">
            <span
              className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
            >
              Back
            </span>
            <span
              className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
            >
              Lay
            </span>
          </div>
        </div>
        <div className="position-relative col-12 d-inline-flex flex-wrap">
          {oddsList?.bm1?.map((item, index) => {
            return (
              <div
                key={index}
                className={`${styles.allMatchBox} col-12 d-inline-flex align-items-stretch position-relative`}
              >
                <div
                  className={`${styles.MatchOddsBox} d-inline-flex flex-column justify-content-center align-items-center col-8`}
                >
                  <label className={`${styles.gameName} d-inline-flex col-12`}>
                    {item.nat}
                  </label>
                  <div className="col-12 d-inline-flex align-items-center">
                  <span
                    className={`${styles.runningExposure} ${
                      item?.sid &&
                      expoData?.bookmakerExpoData?.oldExpoData &&
                      expoData?.bookmakerExpoData?.oldExpoData[item?.sid] &&
                      expoData?.bookmakerExpoData?.oldExpoData[
                        item?.sid
                      ].toFixed(2) > 0
                        ? styles.runningPos
                        : styles.runningNeg
                    } d-inline-flex ps-2 pe-2`}
                  >
                    {item?.sid &&
                      expoData?.bookmakerExpoData?.oldExpoData &&
                      expoData?.bookmakerExpoData?.oldExpoData[item?.sid] &&
                      expoData?.bookmakerExpoData?.oldExpoData[
                        item?.sid
                      ].toFixed(2)}
                  </span>
                  { expoData?.bookmakerExpoData?.showUpdate &&
                    <span
                    className={`${styles.runningExposure} ${
                      item?.sid &&
                      expoData?.bookmakerExpoData?.updatedExpo &&
                      expoData?.bookmakerExpoData?.updatedExpo[item?.sid] &&
                      expoData?.bookmakerExpoData?.updatedExpo[
                        item?.sid
                      ].toFixed(2) > 0
                        ? styles.runningPos
                        : styles.runningNeg
                    } d-inline-flex ps-2 pe-2`}
                  >
                    {
                      item?.sid &&
                      expoData?.bookmakerExpoData?.updatedExpo &&
                      expoData?.bookmakerExpoData?.updatedExpo[item?.sid] &&
                      expoData?.bookmakerExpoData?.updatedExpo[
                        item?.sid
                      ].toFixed(2)}
                  </span> }
               
                  </div> 
                </div>
                <div
                  className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
                >
                  <div
                    onClick={(event) => placeBet(item, 1, event)}
                    className={`${
                      styles.backBetBox
                    } col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center ${
                      prevCountRef.current &&
                      item?.ExchangePrices?.AvailableToBack[0].price !=
                        prevCountRef.current[index]?.Back
                        ? styles.animateSparkBack
                        : ""
                    } ${
                      prevCountRef.current &&
                      item?.ExchangePrices?.AvailableToBack[0].size !=
                        prevCountRef.current[index]?.BackSize
                        ? styles.animateSparkBack
                        : ""
                    }`}
                  >
                    <span className={`${styles.oddStake}`}>{item.b1}</span>
                    <span className={`${styles.oddExposure}`}>{item.bs1}</span>
                  </div>
                  <div
                    onClick={(event) => placeBet(item, 2, event)}
                    className={`${
                      styles.LayBetBox
                    } col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center ${
                      prevCountRef.current &&
                      item?.ExchangePrices?.AvailableToBack[0].price !=
                        prevCountRef.current[index]?.Lay
                        ? styles.animateSparkLay
                        : ""
                    } ${
                      prevCountRef.current &&
                      item?.ExchangePrices?.AvailableToBack[0].size !=
                        prevCountRef.current[index]?.LaySize
                        ? styles.animateSparkLay
                        : ""
                    }`}
                  >
                    <span className={`${styles.oddStake}`}>{item.l1}</span>
                    <span className={`${styles.oddExposure}`}>{item.ls1}</span>
                  </div>
                  {/* SUSPEND BOX */}
                  {item.s !== "ACTIVE" && (
                    <div
                      className={`${styles.oddsDisabled} text-capitalize position-absolute d-inline-flex justify-content-center align-items-center col-12 h-100`}
                    >
                      {item.s}
                    </div>
                  )}
                  {/* END SUSPEND BOX */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-12 d-inline-flex align-items-center justify-content-between mt-2">
          <div
            className={`${styles.betMinMaxAmt} ms-auto d-inline-flex justify-content-end align-items-center`}
          >
            <i className="icon-min-max"></i>
            <span className={styles.minText}>min/max</span>
            <span className={styles.betMinMax}>1/500</span>
          </div>
        </div>
      </div>
    </div>
  );
};
