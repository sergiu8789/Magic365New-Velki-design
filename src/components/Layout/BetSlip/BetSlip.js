import React, { useEffect, useState } from "react";
import { useBet } from "../../../context/BetContextProvider";
import styles from "./BetSlip.module.css";

export const BetSlip = () => {
  const betData = useBet();
  const [betSlip, setBetSlip] = useState("");
  const [betStakeAmt, setbetStakeAmt] = useState(0);
  const [betButton, setbetButton] = useState(true);
  const [betStakeType, setbetStakeType] = useState("");

  const closeBetSlip = () => {
    betData.setBetData({
      ...betData.betData,
      betSlipStatus: "false",
    });
  };

  useEffect(() => {
    setBetSlip(betData.betData.betSlipStatus);
  }, [betData.betData.betSlipStatus]);

  const betAmount = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "00",
    ".",
  ];

  const setBetAmount = (amt) => {
    if (betStakeType === "default" || betStakeType === "") {
      if (amt !== ".") {
        setbetStakeAmt(amt);
      }
    } else {
      if (amt !== ".") {
        if (betStakeAmt === 0) {
          setbetStakeAmt(amt);
        } else {
          let BetAmount = betStakeAmt + amt;
          setbetStakeAmt(BetAmount);
        }
        setbetButton(false);
      }
    }
    setbetStakeType("manual");
  };

  const addBetAmount = (amt) => {
    if (betStakeType === "manual" || betStakeType === "") {
      setbetStakeAmt(amt);
    } else {
      let BetAmount = parseFloat(betStakeAmt) + parseFloat(amt);
      setbetStakeAmt(BetAmount);
      setbetButton(false);
    }
    setbetStakeType("default");
  };

  const betSkateAmt = (betTyp) => {
    if (betTyp === "minus") {
      if (betStakeAmt > 0) {
        let BetAmount = parseFloat(betStakeAmt) - parseFloat(1);
        if (BetAmount !== 0) {
          setbetStakeAmt(BetAmount);
        }
      }
    } else if (betTyp === "plus") {
      let BetAmount = parseFloat(betStakeAmt) + parseFloat(1);
      setbetStakeAmt(BetAmount);
    }
    setbetButton(false);
  };

  const deleteBetAmt = () => {
    let str = betStakeAmt.toString();
    str = str.slice(0, -1);
    if (str === "") {
      setbetStakeAmt("0");
      setbetButton(true);
    } else {
      if (str === "0") {
        setbetStakeAmt("0");
        setbetButton(true);
      } else {
        setbetStakeAmt(str);
        setbetButton(false);
      }
    }
  };

  return (
    <React.Fragment>
      <div
        className={`${styles.BetSlipLayer} ${
          betSlip === "true" && styles.activeSlip
        } position-fixed h-100 d-inline-flex align-items-end`}
      >
        <div
          className={`${styles.BetSlipContainer} col-12 position-relative d-inline-block`}
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
            <span
              className={`${styles.BetIconClose} icon-close position-absolute d-flex justify-content-center align-items-center cursor-pointer`}
              onClick={closeBetSlip}
            ></span>
          </div>
          <div
            className={`${styles.betOddsContainer} col-12 d-inline-flex justify-content-between`}
          >
            <div className="col-6 d-inline-block flex-shrink-1">
              <div
                className={`col-12 d-inline-flex flex-column align-items-center ${styles.betAmountSlip}`}
              >
                <label className={styles.betOddTitle}>Odds</label>
                <div
                  className={`${styles.betAmtPlaceBox} col-12 d-inline-flex align-items-stretch`}
                  disabled
                >
                  <span
                    className={`${styles.betAmtAction} flex-shrink-0 d-inline-flex align-items-center justify-content-center`}
                  >
                    <i className="icon-minus"></i>
                  </span>
                  <span
                    name="odds"
                    className={`${styles.betInputField} d-inline-flex align-items-center justify-content-center`}
                    value="2"
                  >
                    2
                  </span>
                  <input type="hidden" name="odds" value={2} />
                  <span
                    className={`${styles.betAmtAction} flex-shrink-0 d-inline-flex align-items-center justify-content-center`}
                  >
                    <i className="icon-plus"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6 d-inline-block flex-shrink-1">
              <div
                className={`col-12 d-inline-flex flex-column align-items-center ${styles.betAmountSlip}`}
              >
                <label className={styles.betOddTitle}>Stake</label>
                <div
                  className={`${styles.betAmtPlaceBox} col-12 d-inline-flex align-items-stretch`}
                >
                  <span
                    className={`${styles.betAmtAction} flex-shrink-0 d-inline-flex align-items-center justify-content-center`}
                    onClick={() => betSkateAmt("minus")}
                  >
                    <i className="icon-minus"></i>
                  </span>
                  <span
                    name="stake"
                    className={`${styles.betInputField} ${styles.stakeAmt} position-relative d-inline-flex align-items-center justify-content-center`}
                    value={betStakeAmt}
                  >
                    {betStakeAmt}
                  </span>
                  <input type="hidden" name="stake" value={betStakeAmt} />
                  <span
                    className={`${styles.betAmtAction} flex-shrink-0 d-inline-flex align-items-center justify-content-center`}
                    onClick={() => betSkateAmt("plus")}
                  >
                    <i className="icon-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.betAmountSelectin} col-12 d-inline-flex justify-content-center`}
          >
            <span
              className={`${styles.amountBtn} col-3 flex-shrink-1 d-inline-flex align-items-center justify-content-center`}
              onClick={() => addBetAmount("10")}
            >
              +10
            </span>
            <span
              className={`${styles.amountBtn} col-3 flex-shrink-1 d-inline-flex align-items-center justify-content-center`}
              onClick={() => addBetAmount("50")}
            >
              +50
            </span>
            <span
              className={`${styles.amountBtn} col-3 flex-shrink-1 d-inline-flex align-items-center justify-content-center`}
              onClick={() => addBetAmount("100")}
            >
              +100
            </span>
            <span
              className={`${styles.amountBtn} col-3 flex-shrink-1 d-inline-flex align-items-center justify-content-center`}
              onClick={() => addBetAmount("500")}
            >
              +500
            </span>
          </div>
          <div className={`${styles.betAmountsTab} col-12 d-inline-flex`}>
            <div
              className={`${styles.betAmountBtnBox} col-9 flex-shrink-0 d-inline-flex flex-wrap`}
            >
              {betAmount.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <button
                      className={`${styles.betAmtBtn} flex-shrink-0 d-inline-flex justify-content-center align-items-center`}
                      type="button"
                      value={item}
                      onClick={() => setBetAmount(item)}
                    >
                      {item}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
            <div
              className={`${styles.betAmtRemove} col-3 flex-shrink-0 d-inline-flex align-items-center justify-content-center`}
              onClick={deleteBetAmt}
            >
              <i className="icon-backspace"></i>
            </div>
          </div>
          <div
            className={`${styles.betMinMaxAmt} col-12 d-inline-flex justify-content-end align-items-center`}
          >
            <i className="icon-min-max"></i>
            <span className={styles.minText}>min/max</span>
            <span className={styles.betMinMax}>1/2,500</span>
          </div>
          <div className="col-12 d-inline-flex">
            <button
              disabled={betButton}
              className={`${styles.placeBetBtn} col-12 d-inline-flex justify-content-center align-items-center`}
            >
              Place Bet
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
