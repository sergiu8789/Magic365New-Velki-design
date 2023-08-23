import React, { useState, useEffect } from "react";
import styles from "./MatchLiveCard.module.css";
import LiveScoreApiService from "../../../services/LiveScoreApiService";

export const MatchLiveCard = ({
  streamUrl,
  liveWindow,
  streamOut,
  setStreamOut,
  setStreamOutScroll,
}) => {
  console.log(setStreamOutScroll);
  const [ipAddress, setIPAddress] = useState("");

  useEffect(() => {
    LiveScoreApiService.getIP("https://api.ipify.org?format=json")
      .then((response) => {
        if (response?.ip) setIPAddress(response.ip);
      })
      .catch((error) => console.log(error));
  }, []);

  const closeStremingBox = () => {
    console.log("close");
    setStreamOutScroll(1);
    setStreamOut(false);
  };

  return (
    <React.Fragment>
      {streamUrl && ipAddress && (
        <div
          className={`${styles.matchStreemTv} col-12 position-relative`}
          ref={liveWindow}
        >
          <div
            className={`${styles.matchLiveStreem} ${
              streamOut && styles.outsideFrame
            } col-12 overflow-hidden d-inline-flex align-items-center `}
          >
            <iframe
              title="live-score"
              className={styles.liveScoreFrame}
              allowFullScreen={true}
              src={streamUrl + ipAddress}
            ></iframe>
            <div
              className={`${styles.closeIframe} position-absolute justify-content-center align-items-center rounded-full`}
              onClick={() => closeStremingBox()}
            >
              <span className="icon-close"></span>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
