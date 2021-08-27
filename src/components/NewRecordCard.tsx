import { CalendarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import styles from "../assets/styles/WeeklyChart.module.scss";

const NewRecordCard = () => {
  return (
    <Card className={styles.card}>
      <div className={styles.title_section}>
        <p>
          <CalendarOutlined />
          <span>Your Transaction History</span>
        </p>
        <div className={styles.hr} />
      </div>
    </Card>
  );
};

export default NewRecordCard;
