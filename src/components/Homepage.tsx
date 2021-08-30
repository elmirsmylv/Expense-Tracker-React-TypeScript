import { Button } from "antd";
import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../assets/styles/Homepage.module.scss";
import logo from "../assets/images/logo.svg";
import person from "../assets/images/pc_person.svg";

type Props = {};

const Homepage: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo_section}>
          <img src={logo} alt="Expense Tracker Logo" />
        </div>
        <div className={styles.nav_links}>
          <Link to="/home" className={styles.link}>
            Home
          </Link>
          <p className={styles.link}>Pricing</p>
          <p className={styles.link}>Contact Us</p>
          <p className={styles.link}>Help</p>
        </div>
        <div className={styles.buttons}>
          <button
            className={`${styles.button1} ${
              location.pathname === "/register" || location.pathname === "/home"
                ? styles.shadow
                : null
            }`}
          >
            <Link to="/login">Sign In</Link>
          </button>
          <button
            className={`${styles.button2} ${
              location.pathname === "/login" || location.pathname === "/home"
                ? styles.shadow
                : null
            }`}
          >
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {location.pathname === "/home" && (
          <>
            <img src={person} alt="" width="600" />
            <div className={styles.content_titles}>
              <h1>
                Personal <br /> expense tracker
              </h1>
              <p>
                Simplest way to manage personal finances. Because money matters.
              </p>
              <Link style={{ color: "#fff" }} to="/register">
                <button className={styles.get_started}>Get Started</button>
              </Link>
            </div>
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default Homepage;
