import React, { useState, useEffect } from "react";
import styles from "./MatchLiveCard.module.css";
import LiveScoreApiService from "../../../services/LiveScoreApiService";
import { useAuth } from "../../../context/AuthContextProvider";

export const MatchLiveCard = ({
  streamUrl,
  liveWindow,
  streamOut,
  setStreamOut,
  setStreamOutScroll,
}) => {
  const [ipAddress, setIPAddress] = useState("");
  const auth = useAuth();

  useEffect(() => {
    LiveScoreApiService.getIP("https://api.ipify.org?format=json")
      .then((response) => {
        if (response?.ip) setIPAddress(response.ip);
      })
      .catch((err) => {});
  }, []);

  const closeStremingBox = () => {
    setStreamOutScroll(1);
    setStreamOut(false);
  };

  return (
    <React.Fragment>
      {streamUrl && (
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
