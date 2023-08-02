import React from "react";
import styles from "./WhatsAppNumber.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";

export const WhatsAppNumber = () => {
  const openWhatAppLink = () => {
    window.open("http://wa.me/85515519881");
  };
  return (
    <React.Fragment>
      <MenuHeader title="Upline WhatsApp Number" />
      <div className={`col-12 d-inline-block p-4`}>
        <h5 className={`col-12 d-inline-block`}>WhatsApp Number</h5>
        <div
          className={`${styles.settingBoxRow} mt-1 mb-2 col-12 d-inline-flex justify-content-between align-items-center`}
          onClick={openWhatAppLink}
        >
          <div className="d-inline-flex align-items-center">
            <span className={`${styles.whatsapp} icon-whatsapp`}></span>
            <span className={`${styles.settingToggleTitle} d-inline-block`}>
              +85515519881
            </span>
          </div>
          <div
            className={`${styles.messageOut} position-relative d-inline-flex align-items-center`}
          >
            <i className="icon-phone-outgoing"></i>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
