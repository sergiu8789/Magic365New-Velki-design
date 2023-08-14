import React, { useEffect, useState } from "react";
import { useBet } from "../../../context/BetContextProvider";
import styles from "./BetSlip.module.css";
import { encrypt } from "../../../utils/crypto";
import ApiService from "../../../services/ApiService";
import { useAuth } from "../../../context/AuthContextProvider";
import { useApp } from "../../../context/AppContextProvider";
import { BetPlacePopup } from "../BetPlacePopup/BetPlacePopup";

export const BetSlip = () => {
  const betData = useBet();
  const auth = useAuth();
  const appData = useApp();
  const [betSlip, setBetSlip] = useState("");
  const [betButton, setbetButton] = useState(true);
  const [betStakeType, setbetStakeType] = useState("");
  const [betPlacing,setBetPlacing] = useState(false);
  const [betSuccess,setBetSuccess] = useState(true);
  const [betSuccessShow,setBetSuccessShow] = useState(false);

  const closeBetSlip = () => {
    betData.setBetData({
      ...betData.betData,
      betSlipStatus: false,
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

  const placeBet = () => {
    //setProgressStatus("placing");
    let betSelection = betData?.betData?.betSelection;
    appData.setAppData({...appData.appData,listLoading:true});
    let timeout = 4000;
    if (betSelection.market_type === "casino") {
      timeout = 0;
    }
    setTimeout(() => {
      setBetPlacing(true);
    }, timeout);
  }


  const setBetAmount = (amt) => {
    let betSelection = betData?.betData?.betSelection;
    if (betStakeType === "default" || betStakeType === "") {
      if (amt !== ".") {
       // setbetStakeAmt(amt);
       betSelection.amount = amt;
        betData.setBetData({...betData.betData,betSelection : betSelection});
        setbetButton(false);
      }
    } else {
      if (amt !== ".") {
        if (betData.betData.betSelection.amount === 0) {
          betSelection.amount = amt;
          betData.setBetData({...betData.betData,betSelection : betSelection});
        } else {
          if(parseInt(betSelection.amount)===0)
           betSelection.amount =  amt;
          else
            betSelection.amount = betSelection.amount + amt;
            
          if(parseFloat(betSelection.amount) > 500)
           betSelection.amount = 500;
          betData.setBetData({...betData.betData,betSelection : betSelection});
        }
        setbetButton(false);
      }
    }
    setbetStakeType("manual");
  };

  const addBetAmount = (amt) => {
    let betSelection = betData?.betData?.betSelection;
    if (betStakeType === "manual" || betStakeType === "") {
      betSelection.amount = amt;
      betData.setBetData({...betData.betData,betSelection : betSelection});
    } else {
      betSelection.amount = parseFloat(betSelection.amount) + parseFloat(amt);
      if(parseFloat(betSelection.amount) > 500)
      betSelection.amount = 500;
      betData.setBetData({...betData.betData,betSelection : betSelection});
    }
    setbetStakeType("default");
  };

  const betSkateAmt = (betTyp) => {
    let betSelection = betData?.betData?.betSelection;
    if (betTyp === "minus") {
      if (betSelection.amount > 0) {
        betSelection.amount = parseFloat(betSelection.amount) - parseFloat(1);
        if (betSelection.amount !== 0) {
          betData.setBetData({...betData.betData,betSelection : betSelection});
        }
      }
    } else if (betTyp === "plus") {
      betSelection.amount = parseFloat(betSelection.amount) + parseFloat(1);
      if(parseFloat(betSelection.amount) > 500)
      betSelection.amount = 500;
      betData.setBetData({...betData.betData,betSelection : betSelection});
    }
    setbetButton(false);
  };

  const deleteBetAmt = () => {
    let betSelection = betData?.betData?.betSelection;
    let str = betSelection?.amount?.toString();
    str = str.slice(0, -1);
    if (str === "") {
      betSelection.amount = '0';
      betData.setBetData({...betData.betData,betSelection : betSelection});
      setbetButton(true);
    } else {
      if (str === "0") {
        betSelection.amount = '0';
        betData.setBetData({...betData.betData,betSelection : betSelection});
        setbetButton(true);
      } else {
        betSelection.amount = str;
        betData.setBetData({...betData.betData,betSelection : betSelection});
        setbetButton(false);
      }
    }
  };

  useEffect(() => {
    if (betPlacing) {
      
      let betSelection = betData?.betData?.betSelection;
      if (betSelection.status === 'ACTIVE' ) {
        const data = {
          amount: parseFloat(betSelection.amount),
          market_id: betSelection.market_id,
          selection_id: betSelection.selection_id ? betSelection.selection_id.toString() : "",
          type: betSelection.type,
          size: betSelection.size ? encrypt(betSelection.size) : "",
          market_type: betSelection.market_type,
          odds: betSelection.odds ? encrypt(betSelection.odds.toString()) : "",
          match_id: betSelection.match_id,
          runner_name: betSelection.runner_name,
          market_name: betSelection.market_name,
          top: encrypt(Math.floor((new Date()).getTime() / 1000)),
          tou: encrypt(Math.floor((new Date()).getTime() / 1000)),
        };
        if(betSelection.market_type === 'premium'){
          data['pmo'] = betSelection.premiumMarketObject
        }
        ApiService.placeBet(data)
          .then((res) => {
            appData.setAppData({...appData.appData,listLoading:false});
            setBetPlacing(false);
            setBetSuccessShow(true);
            setBetSuccess(true);
            betData.setBetData({
              ...betData.betData,
              betSlipStatus: false
            });
            if (res.status === 200 || res.status === 201) {
             // setBetList(res.data.bets);
             // setSucees(true);
              if (res?.data?.wallet) {
               // setWalletDetails(res.data.wallet);
              }
            }
            if (res.status === 202) {
             // setSucees(false);
             // setFailedMessage(res.message);
            }
          })
          .catch((err) => {
            setBetSuccessShow(true);
            //setBetPlacing(false);
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
            if (err?.response?.data?.statusCode === 400) {
              //setSucees(false);
              //setFailedMessage(err?.response?.data?.message[0]);
            }
          });
     // }
      // else{
      //   setBetPlacing(false);
      //   setProgress(20);
      //   setProgressStatus("");
      //   let message = "Odds are Suspended";
      //   messageData.setMessageData({
      //     ...messageData.messageData,
      //     betConfimationData: {
      //       type: "failed",
      //       message: message,
      //     },
      //   });
      // }
      } else {
        setBetPlacing(false);
        // setProgress(20);
       // setProgressStatus("");
        let message = "Odds are Suspended";
        if (betSelection.status === "SUSPENDED") {
          message = "Odds are Suspended";
        }
        if (betSelection.status === "CLOSED") {
          message = "Market are Closed";
        }
        // messageData.setMessageData({
        //   ...messageData.messageData,
        //   betConfimationData: {
        //     type: "failed",
        //     message: message,
        //   },
        // });
      }
    }
  },[betPlacing]);

  return (
    <React.Fragment>
      <div
        className={`${styles.BetSlipLayer} ${
          betSlip  && styles.activeSlip
        } position-fixed h-100 d-inline-flex align-items-end`}
      >
        <div
          className={`${styles.BetSlipContainer} col-12 position-relative d-inline-block`}
        >
          <div
            className={`${styles.betSlipHeader} col-12 d-flex align-items-center`}
          >
            <span
              className={`${styles.betTag} ${betData?.betData?.betSelection?.type === 1 ? styles.OddbackTag : styles.OddLayTag} position-relative d-inline-flex align-items-center`}
            >
              {betData?.betData?.betSelection?.type === 1 ? "Back" : "Lay"}
            </span>
            <span className={`${styles.betTeamName} d-inline-block`}>
              {betData?.betData?.betSelection?.runner_name}
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
                    {betData?.betData?.betSelection?.odds}
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
                    value={betData?.betData?.betSelection?.amount}
                  >
                    {betData?.betData?.betSelection?.amount}
                  </span>
                  <input type="hidden" name="stake" value={betData?.betData?.betSelection?.amount} />
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
              onClick={placeBet}
              className={`${styles.placeBetBtn} col-12 d-inline-flex justify-content-center align-items-center`}
            >
              Place Bet
            </button>
          </div>
        </div>
      </div>
      <BetPlacePopup status={betSuccess} show={betSuccessShow} setShow={setBetSuccessShow}
       title={"Bet Matched"} betDetails={betData?.betData?.betSelection}/>
    </React.Fragment>
  );
};
