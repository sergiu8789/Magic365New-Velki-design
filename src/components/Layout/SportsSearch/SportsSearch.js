import React, { useEffect, useState } from "react";
import styles from "./SportsSearch.module.css";
import { useNavigate } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { useAuth } from "../../../context/AuthContextProvider";
import { useApp } from "../../../context/AppContextProvider";

export const SportsSearch = ({ sportSearch, setSportSearch }) => {
  const [searchVal, setSearchVal] = useState("");
  const [newSearchList, setSearchList] = useState([]);
  const [newEvents, setnewEvents] = useState([]);
  const [tabActive, settabActive] = useState("Cricket");
  const [leagueMatch, showleagueMatch] = useState("SearchList");
  const [newCompetition, setnewCompetition] = useState([]);
  const [leagueName, showleagueName] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  const [LeagueTournName, setleagueName] = useState("");
  const auth = useAuth();
  const appData = useApp();
  const navigate = useNavigate();

  const getInputVal = (event) => {
    setSearchVal(event.target.value);
  };

  const submitSearchVal = (event, value) => {
    let getSearchVal = localStorage.getItem("searchHistory");
    event.preventDefault();
    if (value.length > 0) {
      if (getSearchVal && getSearchVal.length > 0) {
        getSearchVal = JSON.parse(getSearchVal);
        if (getSearchVal.indexOf(value) === -1) {
          getSearchVal.push(value);
        }
        getSearchVal = JSON.stringify(getSearchVal);
        setSearchList(getSearchVal);
        localStorage.setItem("searchHistory", getSearchVal);
      } else {
        getSearchVal = [];
        getSearchVal.push(value);
        getSearchVal = JSON.stringify(getSearchVal);
        setSearchList(getSearchVal);
        localStorage.setItem("searchHistory", getSearchVal);
      }
    }
  };

  const highlightText = (text, val) => {
    if (text.indexOf(val) > -1) {
      let textMatch = text.split(val);
      return (
        <div className="truncate">
          {textMatch[0] ? textMatch[0] : ""}
          <span className={styles.highlightText}>{val}</span>
          {textMatch[1] ? textMatch[1] : ""}
        </div>
      );
    } else {
      return text;
    }
  };

  const openGameDetail = (match) => {
    navigate("/full-market", {
      state: {
        match_id: match.id,
        market_id: match.market_id,
        type: "match_odds",
        teamone: match.team_one_name,
        teamtwo: match.team_two_name,
      },
    });
  };

  useEffect(() => {
    let getSearchVal = localStorage.getItem("searchHistory");
    setSearchList(JSON.parse(getSearchVal));
  }, [localStorage.getItem("searchHistory")]);

  useEffect(() => {
    if (leagueName) {
      appData.setAppData({ ...appData.appData, listLoading: true });
      setMatchList([]);
      ApiService.tournamentMatchList(tabActive, leagueName).then((res) => {
        appData.setAppData({ ...appData.appData, listLoading: false });
        if (res?.data?.data) {
          let marketId = [];
          setMatchList(res.data.data);
          res?.data?.data?.forEach((item) => {
            marketId.push(item.market_id);
          });
          setMatchIds(marketId);
        }
      });
    }
  }, [leagueName]);

  useEffect(() => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    ApiService.sportsSearchList(searchVal)
      .then((res) => {
        setnewEvents(res.data);
        appData.setAppData({ ...appData.appData, listLoading: false });
      })
      .catch((err) => {
        appData.setAppData({ ...appData.appData, listLoading: false });
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

    ApiService.sportsCompetitionList(searchVal)
      .then((res) => {
        setnewCompetition(res.data);
        appData.setAppData({ ...appData.appData, listLoading: false });
      })
      .catch((err) => {
        appData.setAppData({ ...appData.appData, listLoading: false });
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
  }, [searchVal]);

  return (
    <React.Fragment>
      <div
        className={`${styles.searchLayer} ${
          sportSearch ? "visible" : "invisible"
        } start-0 end-0 bottom-0 position-fixed col-12 d-inline-flex flex-column m-auto`}
      >
        <form
          onSubmit={(event) => submitSearchVal(event, searchVal)}
          className={`${styles.SearchBox} col-12 d-inline-flex position-sticky`}
        >
          <input
            type="text"
            value={searchVal}
            onChange={(event) => getInputVal(event)}
            placeholder="Search teams, competitions, and more..."
            className={`${styles.matchSearch} col-12 flex-shrink-1 d-inline-flex`}
          />
          <span
            className={`${styles.closeSearch} d-inline-flex align-items-center justify-content-center`}
            onClick={() => setSportSearch(false)}
          >
            <i className="icon-close"></i>
          </span>
        </form>
        <div
          className={`${styles.allSearchResult} overflow-y-auto col-12 d-inline-flex flex-column position-relative`}
        >
          {searchVal === "" && newSearchList && (
            <div
              className={`${styles.recentSearches} col-12 d-inline-flex flex-column`}
            >
              <h2 className={`${styles.leagueTitle} col-12 d-inline-flex m-0`}>
                History
              </h2>
              <div
                className={`${styles.allRecentHistory} overflow-hidden d-inline-flex flex-column`}
              >
                {newSearchList.map((item, index) => {
                  return (
                    <div
                      className={`${styles.recentSearchRow} d-inline-flex align-items-center justify-content-between`}
                      onClick={() => setSearchVal(item)}
                      key={index}
                    >
                      <div
                        className={`${styles.recentSearchName} d-inline-flex align-items-center`}
                      >
                        <span className="icon-history"></span>
                        <label className={`${styles.searchName} d-inline-flex`}>
                          {item}
                        </label>
                      </div>
                      <span
                        className={`${styles.searchIcon} icon-arrow-left`}
                      ></span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {leagueMatch === "SearchList" ? (
            <React.Fragment>
              {searchVal !== "" && newCompetition.length > 0 && (
                <div
                  className={`${styles.recentSearches} col-12 d-inline-flex flex-column`}
                >
                  <h2
                    className={`${styles.leagueTitle} col-12 d-inline-flex m-0`}
                  >
                    Competition
                  </h2>
                  <div
                    className={`${styles.allRecentHistory} overflow-hidden d-inline-flex flex-column`}
                  >
                    {newCompetition.map((item, index) => {
                      return (
                        <div
                          className={`${styles.recentSearchRow} d-inline-flex align-items-center justify-content-between`}
                          key={index}
                          onClick={() => {
                            showleagueName(item.trn_slug);
                            showleagueMatch("LeagueMatches");
                            settabActive(item.game_slug);
                            setleagueName(item.trn_name);
                          }}
                        >
                          <div
                            className={`${styles.resultSearchName} d-inline-flex flex-column align-items-start justify-content-center`}
                          >
                            <label
                              className={`${styles.searchName} d-inline-flex align-items-center col-12`}
                            >
                              {highlightText(item.trn_name, searchVal)}
                            </label>
                          </div>
                          <span
                            className={`${styles.searchIcon} icon-arrow-left`}
                          ></span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {searchVal !== "" && newEvents.length > 0 && (
                <div
                  className={`${styles.recentSearches} col-12 d-inline-flex flex-column`}
                >
                  <h2
                    className={`${styles.leagueTitle} col-12 d-inline-flex m-0`}
                  >
                    Events
                  </h2>
                  <div
                    className={`${styles.allRecentHistory} overflow-hidden d-inline-flex flex-column`}
                  >
                    {newEvents.map((item, index) => {
                      return (
                        <div
                          className={`${styles.recentSearchRow} d-inline-flex align-items-center justify-content-between`}
                          key={index}
                          onClick={() => openGameDetail(item)}
                        >
                          <div
                            className={`${styles.resultSearchName} d-inline-flex flex-column align-items-start justify-content-center`}
                          >
                            <label
                              className={`${styles.searchName} d-inline-flex align-items-center col-12`}
                            >
                              {highlightText(item.team_one_name, searchVal)}
                            </label>
                            <label
                              className={`${styles.searchName} d-inline-flex align-items-center col-12`}
                            >
                              {highlightText(item.team_two_name, searchVal)}
                            </label>
                          </div>
                          <span
                            className={`${styles.searchIcon} icon-arrow-left`}
                          ></span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </React.Fragment>
          ) : leagueMatch === "LeagueMatches" ? (
            <React.Fragment>
              <div
                className={`${styles.recentSearches} col-12 d-inline-flex flex-column`}
              >
                <div
                  className={`${styles.backSearchList} col-12 d-inline-flex align-items-center`}
                >
                  <div
                    className={`${styles.backSearch} d-inline-flex align-items-center`}
                    onClick={() => showleagueMatch("SearchList")}
                  >
                    <span className="icon-arrow-left"></span>
                    <span className="d-inline-flex">Back</span>
                  </div>
                  <label className={`${styles.tournamentName} d-inline-flex`}>
                    {LeagueTournName}
                  </label>
                </div>
                <div
                  className={`${styles.allRecentHistory} overflow-hidden d-inline-flex flex-column`}
                >
                  {matchList.map((item, index) => {
                    return (
                      <div
                        className={`${styles.recentSearchRow} d-inline-flex align-items-center justify-content-between`}
                        key={index}
                        onClick={() => openGameDetail(item)}
                      >
                        <div
                          className={`${styles.resultSearchName} d-inline-flex flex-column align-items-start justify-content-center`}
                        >
                          <label
                            className={`${styles.searchName} d-inline-flex align-items-center col-12`}
                          >
                            {item.team_one_name}
                          </label>
                          <label
                            className={`${styles.searchName} d-inline-flex align-items-center col-12`}
                          >
                            {item.team_two_name}
                          </label>
                        </div>
                        <span
                          className={`${styles.searchIcon} icon-arrow-left`}
                        ></span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
