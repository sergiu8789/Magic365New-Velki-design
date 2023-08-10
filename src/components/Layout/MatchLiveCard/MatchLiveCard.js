import React, { useState, useEffect } from "react";
import styles from "./MatchLiveCard.module.css";
import ApiService from "../../../services/ApiService";
import LiveScoreApiService from "../../../services/LiveScoreApiService";

export const MatchLiveCard = ({ matchId }) => {
  const [liveUrl, setLiveUrl] = useState("");
  const [ipAddress, setIPAddress] = useState("");

  useEffect(() => {
    ApiService.getScoreCard(matchId).then((res) => {
      console.log(res);
      if (res?.scoreUrl || res?.streamingUrl) setLiveUrl(res.streamingUrl);
    });
    LiveScoreApiService.getIP("https://api.ipify.org?format=json")
      .then((response) => {
        if (response?.ip) setIPAddress(response.ip);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <React.Fragment>
      {liveUrl && (
        <div
          className={`${styles.matchScoreGraph} col-12 d-inline-flex align-items-center position-relative`}
        >
          <iframe
            title="live-score"
            className={styles.liveScoreFrame}
            allowFullScreen={true}
            src={liveUrl + ipAddress}
          ></iframe>
        </div>
      )}
    </React.Fragment>
  );
};
