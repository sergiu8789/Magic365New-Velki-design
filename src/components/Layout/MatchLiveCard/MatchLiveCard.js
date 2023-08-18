import React, { useState, useEffect } from "react";
import styles from "./MatchLiveCard.module.css";
import LiveScoreApiService from "../../../services/LiveScoreApiService";

export const MatchLiveCard = ({ streamUrl }) => {
  const [ipAddress, setIPAddress] = useState("");
  useEffect(() => {
    LiveScoreApiService.getIP("https://api.ipify.org?format=json")
      .then((response) => {
        if (response?.ip) setIPAddress(response.ip);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <React.Fragment>
      {streamUrl && ipAddress && (
        <div
          className={`${styles.matchScoreGraph} col-12 overflow-hidden d-inline-flex align-items-center `}
        >
          <iframe
            title="live-score"
            className={styles.liveScoreFrame}
            allowFullScreen={true}
            src={streamUrl + ipAddress}
          ></iframe>
        </div>
      )}
    </React.Fragment>
  );
};
