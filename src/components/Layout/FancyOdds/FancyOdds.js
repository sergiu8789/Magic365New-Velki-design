import React, { useState, useEffect, useRef } from "react";
import styles from "./FancyOdds.module.css";
import { useBet } from "../../../context/BetContextProvider";
import { useExposure } from "../../../context/ExposureContextProvider";

export const FancyOdds = ({ oddsList, matchId, time,betList }) => {
  const betData = useBet();
  const expoData = useExposure();
  const [matchFancyOdds, setMatchFancyOdds] = useState("");
  const prevCountRef = useRef(matchFancyOdds);

  const placeBet = (item, type) => {
    const betSelection = {
      amount: "",
      type: type,
      size: type === 1 ? item?.b1 : item?.l1,
      odds: type === 1 ? item?.bs1 : item?.ls1,
      selection: item.nat,
      runner_name: item.nat,
      selection_id: item.sid,
      market_id: item.mid,
      match_id: matchId,
      market_name: "",
      status: item.gstatus,
      market_type: "fancy",
    };
    betData.setBetData({
      ...betData.betData,
      betSlipStatus: true,
      betSelection: betSelection,
    });
  };

  useEffect(() => {
    let allRunners = [];
    if (oddsList?.length) {
      let matched = oddsList.filter((item) => {
        if (
          item.nat === betData?.betData?.betSelection?.selection &&
          item.gstatus !== betData?.betData?.betSelection?.status
        ) {
          return item;
        }
      });
      if (matched?.length){
        betData.setBetData({
          ...betData.betData,
          betSelection: {
            ...betData.betData.betSelection,
            status: matched[0].gstatus,
          },
        });
      }
      else{
        betData.setBetData({
          ...betData.betData,
          betSelection: { ...betData.betData.betSelection, status: "Expired" },
        });
      }
      oddsList?.map((item, index) => {
        let gameName = {
          Back: item?.b1,
          BackSize: item?.bs1,
          Lay: item?.l1,
          LaySize: item?.ls1,
        };
        allRunners.push(gameName);
      });
      setMatchFancyOdds(allRunners);
      prevCountRef.current = matchFancyOdds;
    }
  }, [oddsList]);

useEffect(() => {
  let fancyExposure = {};

  betList?.forEach((bet) => {
    if (bet.market_type === "fancy") {
      bet.selection = bet?.selection_id?.toString();
      if (fancyExposure[bet.selection_id]) {
        fancyExposure[bet.selection_id].stake =
          fancyExposure[bet.selection_id].stake + (bet.type === 1 ?  parseFloat(bet.amount) :  (parseFloat(bet.odds) / 100 + 1) * parseFloat(bet.amount) -
          parseFloat(bet.amount));
      } else {
        fancyExposure[bet.selection_id] = {
          stake: bet.type === 1 ?  parseFloat(bet.amount) :  (parseFloat(bet.odds) / 100 + 1) * parseFloat(bet.amount) -
          parseFloat(bet.amount)
        };
      }
    }
  });

 expoData.setFancyExpoData({oldExpoData : fancyExposure,updatedExpo:{}});
 
},[betList]);

useEffect(() => {
  if (betData.betData.betSelection.market_type === "fancy") {
    let fancyExposure = {};

    if (expoData.fancyExpoData.oldExpoData[betData.betData.betSelection.selection_id]) {
      if(betData.betData.betSelection.amount){
       fancyExposure[betData.betData.betSelection.selection_id?.toString()] = {stake :  expoData.fancyExpoData.oldExpoData[betData.betData.betSelection.selection_id].stake + (betData.betData.betSelection.type === 1 ?  parseFloat(betData.betData.betSelection.amount) :  (parseFloat(betData.betData.betSelection.odds) / 100 + 1) * parseFloat(betData.betData.betSelection.amount) -
       parseFloat(betData.betData.betSelection.amount))};
       ;
      }
      else
      fancyExposure[betData.betData.betSelection.selection_id?.toString()] = {stake : expoData.fancyExpoData.oldExpoData[betData.betData.betSelection.selection_id].stake}
     
    } else {
      if(betData.betData.betSelection.amount){
        fancyExposure[betData.betData.betSelection.selection_id?.toString()] = {
         stake: betData.betData.betSelection.type === 1 ?  parseFloat(betData.betData.betSelection.amount) :  (parseFloat(betData.betData.betSelection.odds) / 100 + 1) * parseFloat(betData.betData.betSelection.amount) -
          parseFloat(betData.betData.betSelection.amount)
        };
      }
      else{
        fancyExposure[betData.betData.betSelection.selection_id?.toString()] = { stake : 0 }
      }
    }
    expoData.setFancyExpoData({...expoData.fancyExpoData,updatedExpo: fancyExposure})
   
  }
  
}, [betData.betData.betSelection.amount,betData.betData.betSelection.selection_id]);

  return (
    <React.Fragment>
      <div className="col-12 d-inline-flex justify-content-end">
        <div className="col-8  align-items-center">Last Updated : {time}</div>
        <div className="col-4 d-inline-flex align-items-center">
          <span
            className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
          >
            No
          </span>
          <span
            className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
          >
            Yes
          </span>
        </div>
      </div>
      {oddsList
        ?.sort(function (a, b) {
          if (a.nat < b.nat) {
            return -1;
          }
          if (a.nat > b.nat) {
            return 1;
          }
          return 0;
        })
        ?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="position-relative col-12 d-inline-flex flex-wrap">
                <div
                  className={`${styles.allMatchBox} col-12 d-inline-flex align-items-stretch position-relative`}
                >
                  <div
                    className={`${styles.gameName} d-inline-flex align-items-center col-8`}
                  >
                    {item.nat}
                    ({expoData?.fancyExpoData?.oldExpoData[item.sid]?.stake?.toFixed(2)})
                    --- ({ expoData?.fancyExpoData?.updatedExpo && expoData?.fancyExpoData?.updatedExpo[item.sid]?.stake?.toFixed(2)})
                  </div>
                  <div
                    className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
                  >
                    <div
                      onClick={() => placeBet(item, 2)}
                      className={`${
                        styles.LayBetBox
                      } col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center ${
                        item.l1 != prevCountRef.current[index]?.Lay
                          ? styles.animateSparkLay
                          : ""
                      } ${
                        item.ls1 != prevCountRef.current[index]?.LaySize
                          ? styles.animateSparkLay
                          : ""
                      }`}
                    >
                      <span className={`${styles.oddStake}`}>{item.l1}</span>
                      <span className={`${styles.oddExposure}`}>
                        {item.ls1}
                      </span>
                    </div>
                    <div
                      onClick={() => placeBet(item, 1)}
                      className={`${
                        styles.backBetBox
                      } col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center  ${
                        item.b1 != prevCountRef.current[index]?.Back
                          ? styles.animateSparkBack
                          : ""
                      } ${
                        item.bs1 != prevCountRef.current[index]?.BackSize
                          ? styles.animateSparkBack
                          : ""
                      }`}
                    >
                      <span className={`${styles.oddStake}`}>{item.b1}</span>
                      <span className={`${styles.oddExposure}`}>
                        {item.bs1}
                      </span>
                    </div>
                    {/* SUSPEND BOX */}
                    {item.gstatus != "" && (
                      <div
                        className={`${styles.oddsDisabled} text-capitalize position-absolute d-inline-flex justify-content-center align-items-center col-12 h-100`}
                      >
                        {item.gstatus}
                      </div>
                    )}
                    {/* END SUSPEND BOX */}
                  </div>
                </div>
              </div>
              <div className="col-12 d-inline-flex align-items-center justify-content-end mt-1">
                <div
                  className={`${styles.betMinMaxAmt} d-inline-flex justify-content-end align-items-center`}
                >
                  <i className="icon-min-max"></i>
                  <span className={styles.minText}>min/max</span>
                  <span className={styles.betMinMax}>
                    {/* {item.min}/{item.max} */}
                    1/500
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};
