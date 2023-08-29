import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeFooter.module.css";

export const HomeFooter = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div
        className={`col-12 position-relative d-inline-flex justify-content-center ${styles.footerSocialIcons}`}
      >
        <span
          className={`block cursor-pointer d-inline-flex align-items-center justify-content-center text-decoration-none mx-1 ${styles.socialIcon} `}
        >
          <span className="icon-telegram"></span>
        </span>
        <span
          className={`block cursor-pointer d-inline-flex align-items-center justify-content-center text-decoration-none mx-1 ${styles.socialIcon} `}
        >
          <span className="icon-whatsapp"></span>
        </span>
        <span
          className={`block cursor-pointer d-inline-flex align-items-center justify-content-center text-decoration-none mx-1 ${styles.socialIcon} `}
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
        >
          Privacy Policy
        </span>
        <span
          className={`${styles.homeEssentialLink} text-decoration-none d-inline-block`}
          onClick={() => navigate("/terms")}
        >
          Terms and Conditions
        </span>
        <span
          className={`${styles.homeEssentialLink} text-decoration-none d-inline-block`}
          onClick={() => navigate("/rules")}
        >
          Rules and Regulations
        </span>
        <span
          className={`${styles.homeEssentialLink} text-decoration-none d-inline-block`}
          onClick={() => navigate("/kyc")}
        >
          KYC
        </span>
        <span
          className={`${styles.homeEssentialLink} text-decoration-none d-inline-block`}
          onClick={() => navigate("/gaming")}
        >
          Responsible Gaming
        </span>
      </div>
    </React.Fragment>
  );
};
