import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeFooter.module.css";

export const HomeFooter = () => {
  const navigate = useNavigate();

  const openSocialLink = (type) => {
    if (type === "facebook") {
      window.open("https://www.facebook.com", "_blank");
    } else if (type === "whatsapp") {
      window.open("https://www.whatsapp.com/", "_blank");
    } else if (type === "telegram") {
      window.open("https://web.telegram.org/k/", "_blank");
    }
  };

  return (
    <React.Fragment>
      <div
        className={`col-12 position-relative d-inline-flex justify-content-center ${styles.footerSocialIcons}`}
      >
        <span
          className={`block cursor-pointer d-inline-flex align-items-center justify-content-center text-decoration-none mx-1 ${styles.socialIcon} `}
          onClick={() => openSocialLink("telegram")}
          role="button"
        >
          <span className="icon-telegram"></span>
        </span>
        <span
          className={`block cursor-pointer d-inline-flex align-items-center justify-content-center text-decoration-none mx-1 ${styles.socialIcon} `}
          onClick={() => openSocialLink("whatsapp")}
          role="button"
        >
          <span className="icon-whatsapp"></span>
        </span>
        <span
          className={`block cursor-pointer d-inline-flex align-items-center justify-content-center text-decoration-none mx-1 ${styles.socialIcon} `}
          onClick={() => openSocialLink("facebook")}
          role="button"
        >
          <span className="icon-facebook"></span>
        </span>
      </div>
      <div
        className={`${styles.footerHomeLinksRow} d-inline-flex justify-content-center col-12 flex-wrap `}
      >
        <span
          className={`${styles.homeEssentialLink} text-decoration-none d-inline-block`}
          onClick={() => navigate("/privacy")}
          role="button"
        >
          Privacy Policy
        </span>
        <span
          className={`${styles.homeEssentialLink} text-decoration-none d-inline-block`}
          onClick={() => navigate("/terms")}
          role="button"
        >
          Terms and Conditions
        </span>
        <span
          className={`${styles.homeEssentialLink} text-decoration-none d-inline-block`}
          onClick={() => navigate("/rules")}
          role="button"
        >
          Rules and Regulations
        </span>
        <span
          className={`${styles.homeEssentialLink} text-decoration-none d-inline-block`}
          onClick={() => navigate("/kyc")}
          role="button"
        >
          KYC
        </span>
        <span
          className={`${styles.homeEssentialLink} text-decoration-none d-inline-block`}
          onClick={() => navigate("/gaming")}
          role="button"
        >
          Responsible Gaming
        </span>
      </div>
    </React.Fragment>
  );
};
