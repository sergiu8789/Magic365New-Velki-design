import React, { useState } from "react";
import styles from "./SportsSearch.module.css";

export const SportsSearch = ({ sportSearch, setSportSearch }) => {
  const [searchVal, setSearchVal] = useState("");

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
        localStorage.setItem("searchHistory", getSearchVal);
      } else {
        getSearchVal = [];
        getSearchVal.push(value);
        getSearchVal = JSON.stringify(getSearchVal);
        localStorage.setItem("searchHistory", getSearchVal);
      }
    }
  };

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
          <div
            className={`${styles.recentSearches} col-12 d-inline-flex flex-column`}
          >
            <h2 className={`${styles.leagueTitle} col-12 d-inline-flex m-0`}>
              History
            </h2>
            <div
              className={`${styles.allRecentHistory} overflow-hidden d-inline-flex flex-column`}
            >
              <div
                className={`${styles.recentSearchRow} d-inline-flex align-items-center justify-content-between`}
              >
                <div
                  className={`${styles.recentSearchName} d-inline-flex align-items-center`}
                >
                  <span className="icon-history"></span>
                  <label className={`${styles.searchName} d-inline-flex`}>
                    India
                  </label>
                </div>
                <span className={`${styles.searchIcon} icon-arrow-left`}></span>
              </div>
              <div
                className={`${styles.recentSearchRow} d-inline-flex align-items-center justify-content-between`}
              >
                <div
                  className={`${styles.recentSearchName} d-inline-flex align-items-center`}
                >
                  <span className="icon-history"></span>
                  <label className={`${styles.searchName} d-inline-flex`}>
                    India
                  </label>
                </div>
                <span className={`${styles.searchIcon} icon-arrow-left`}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
