import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../PrivacyPolicy/PrivacyPolicy.module.css";

export const KYC = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div
        className={`${styles.infoPageheader} col-12 d-inline-flex position-relative justify-content-center align-items-center`}
      >
        <label className={`${styles.pageName} d-inline-flex`}>KYC</label>
        <span
          className={`${styles.closePage} position-absolute end-0 d-inline-flex align-items-center justify-content-center icon-close`}
          onClick={() => navigate(-1)}
        ></span>
      </div>
      <div
        className={`${styles.infoPageContent} position-relative col-12 d-inline-flex flex-column overflow-y-auto`}
      >
        <h2>KNOW YOUR CUSTOMER POLICY</h2>
        <p>
          {" "}
          To maintain the highest level of security, we require all our members
          to provide us with certain documentation in order to validate their
          accounts.
          <br />
          <br />
          Please note that the identification procedures shall be done before a
          cardholder starts operating and using services of our merchants.{" "}
        </p>
        <br />
        <br />
        <h2>Why do I need to provide documentation?</h2>
        <p>
          {" "}
          There are several reasons:
          <br />
          <br />
          We are committed to providing a socially responsible platform for
          online gaming. All of our members must be 18 or older and we are bound
          by our licensing agreement to verify this.
          <br />
          <br />
          Secondly, as a respected online and global company it is in our
          interests to guarantee maximum security on all transactions.
          <br />
          <br />
          Thirdly, our payment processors require that our policies are in line
          with international banking standards. A proven business relationship
          with each and every member is mandatory for the protection of all
          parties. Our licensing agreement also obliges us to comply with this.{" "}
          <br />
          <br />
          Finally, by ensuring that your account details are absolutely correct,
          the inconvenience of 'missing payments' can be avoided. It can take
          weeks (and sometimes months) to trace, recall and resend using the
          correct information. This lengthy process also results in additional
          fees from our processors.{" "}
        </p>
        <br />
        <br />
        <h2>WHAT DOCUMENTS DO I NEED TO PROVIDE?</h2>
        <p>
          PROOF OF ID:
          <br />A color copy of a valid government issued form of ID (Driver's
          License, Passport, State ID or Military ID)
        </p>
        <br />
        <br />
        <h2>PROOF OF ADDRESS:</h2>
        <p>
          {" "}
          A copy of a recent utility bill showing your address
          <br />
          <br />
          Note: If your government Id shows your address, you do not need to
          provide further proof of address.
          <br />
          <br />
          Additional documentation might be required depending on the withdrawal
          method you choose{" "}
        </p>
        <br />
        <br />
        <h2>When do I need to provide these documents?</h2>
        <p>
          {" "}
          We greatly appreciate your cooperation in providing these at your
          earliest possible convenience to avoid any delays in processing your
          transactions. We must be in receipt of the documents before any cash
          transactions can be sent back to you. Under special circumstances we
          may require the documents before further activity (deposits and
          wagering) can take place on your account
          <br />
          <br /> Please understand, if we do not have the required documents on
          file, your pending withdrawals will be cancelled and credited back to
          your account. You will be notified when this happens via the
          notification system.{" "}
        </p>
        <br />
        <br />
        <h2>How can I send you these documents?</h2>
        <p>
          {" "}
          Please scan your documents, or take a high quality digital camera
          picture, save the images as jpegs, then upload the files using our
          secure form here.{" "}
        </p>
        <br />
        <br />
        <h2>How do I know my documents are safe with you?</h2>
        <p>
          {" "}
          The security of your documentation is of paramount importance. All
          files are protected with the highest level of encryption at every step
          of the review process. All documentation received is treated with the
          utmost respect and confidentiality.
          <br />
          <br />
          We’d like to thank you for your cooperation in helping us make
          Magic365.LIVE a safer place to play. As always, if you have any
          questions about this policy, or anything else, don’t hesitate to
          contact us using the contact us links on this page.{" "}
        </p>
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};
