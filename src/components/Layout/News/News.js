import React, { useEffect, useState } from "react";
import styles from "./News.module.css";
import ApiService from "../../../services/ApiService";
import { useAuth } from "../../../context/AuthContextProvider";

export const News = () => {
  const [newsContent, setNewsContent] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    ApiService.getNews()
      .then((res) => {
        if (res?.data?.rows) setNewsContent(res.data.rows);
      })
      .catch((err) => {
        if (
          err?.response?.data?.statusCode === 401 &&
          err?.response?.data?.message === "Unauthorized"
        ) {
          localStorage.removeItem("token");
          auth.setAuth({
            ...auth.auth,
            isloggedIn: false,
            user: {},
            showSessionExpire: true,
          });
        }
      });
  }, []);

  return (
    <React.Fragment>
      <div
        className={`${styles.newsRowContainer} col-12 d-inline-flex align-items-center`}
      >
        <div
          className={`${styles.newsIcon} d-inline-flex justify-content-center align-items-center flex-shrink-0`}
        >
          <i className="icon icon-mic d-inline-block"></i>
        </div>
        <div className={`${styles.newsHighlightRow} overflow-hidden`}>
          <ul
            className={`list-unstyled ${styles.marqueeList} position-relative d-inline-flex pl-0 align-items-center translate-x-full m-0`}
          >
            {newsContent.map((item, index) => (
              <li
                className={`flex-shrink-0 ${styles.whitespaceNowrap} mr-5`}
                key={index}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
