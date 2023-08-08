import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LeagueMatchBets.module.css";
import ApiService from "../../../services/ApiService";
import { firstLetterCapital } from "../../../utils/helper";

export const LeagueMatchBets = ({ selectedMatch, setleagueMatch }) => {
  const navigate = useNavigate();
  const [otherMarketList,setOtherMarketList] = useState([]);
  const showMatchList = () => {
    setleagueMatch("LeagueMatches");
  };

  const showMatchBetDetail = (market) => {
    navigate("/full-market",{
      state:{match_id : selectedMatch.id,market_id:market.market_id,type:market.type}
    });
  };

  useEffect(() => {
    ApiService.getMatchOdds(selectedMatch.id).then((res) => {
      let list = [{type : "match_odds",market_id:selectedMatch.market_id}];
      if (res?.data?.odds?.length) {
        res?.data?.odds[0].map((item) => {
          if (
            item.market_id &&
            item.market_id !== null &&
            item.market_type !== "fancy" &&
            item.market_type !== "bookmaker" && item.market_type !== "match_odds"
          ) {
            if(!list.filter((tab) => tab.type === item.market_type)?.length){
              list.push({type : item.market_type,market_id:item.market_id});
            }
          }
        });
      };
      setOtherMarketList(list);
    });
  },[]);

  return (
    <React.Fragment>
      <div
        className={`${styles.matchDetailHeader} col-12 d-inline-flex align-items-center`}
      >
        <i className="icon-arrow-left" onClick={showMatchList}></i>
        <span className={styles.matchName}>{selectedMatch.team_one_name} v/s {selectedMatch.team_two_name}</span>
      </div>
      <div className={`${styles.allMatchBets} col-12 d-inline-block`}>
        <div
          className={`${styles.matchBetsBox} col-12 d-inline-flex flex-column overflow-hidden`}
        >
          {otherMarketList.map((item,index) => {
            return(
              <div
              key={index}
              className={`${styles.singleMatchBets} col-12 d-inline-flex flex-column position-relative`}
              onClick={() => showMatchBetDetail(item)}
            >
              <h4 className={styles.teamName}>{firstLetterCapital(item?.type?.replace("_", " "))}</h4>
              <span
                className={`${styles.MatchArrow} position-absolute d-inline-flex icon-arrow-left`}
              ></span>
            </div>
            )
          })}
         
        </div>
      </div>
    </React.Fragment>
  );
};
