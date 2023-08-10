import React,{useState} from 'react';
import styles from "../MatchOdds/MatchOdds.module.css";

export const BookmakerOdds = ({oddsList}) => {
  const [hideBookMarker, sethideBookMarker] = useState("false");
  const hideBookMarkerOdd = () => {
    if (hideBookMarker === "true") {
      sethideBookMarker("false");
    } else {
      sethideBookMarker("true");
    }
  };

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
        {oddsList?.bm1?.map((item,index) => {
            return(
              <div key={index}
              className={`${styles.allMatchBox} col-12 d-inline-flex align-items-stretch position-relative`}
            >
              <div
                className={`${styles.gameName} d-inline-flex align-items-center col-8`}
              >
                {item.nat}
              </div>
              <div
                className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
              >
                <div
                  className={`${styles.backBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                >
                  <span className={`${styles.oddStake}`}>{item.b1}</span>
                  <span className={`${styles.oddExposure}`}>{item.bs1}</span>
                </div>
                <div
                  className={`${styles.LayBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                >
                  <span className={`${styles.oddStake}`}>{item.l1}</span>
                  <span className={`${styles.oddExposure}`}>{item.ls1}</span>
                </div>
              </div>
            </div>
            )
        })}
       
       
      </div>
      <div className="col-12 d-inline-flex align-items-center justify-content-between mt-2">
        <div
          className={`${styles.betMinMaxAmt} ms-auto d-inline-flex justify-content-end align-items-center`}
        >
          <i className="icon-min-max"></i>
          <span className={styles.minText}>min/max</span>
          <span className={styles.betMinMax}>1/2,500</span>
        </div>
      </div>
    </div>
  </div>
  )
}
