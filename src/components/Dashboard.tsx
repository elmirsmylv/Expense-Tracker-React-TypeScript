import { Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../store";
import { getRecords } from "../store/actions/recordActions";
import styles from "../assets/styles/Dashboard.module.scss";
import food from "../assets/images/food.svg";
import wallet from "../assets/images/wallet.svg";
import movies from "../assets/images/movies.svg";
import WeeklyChart from "./WeeklyChart";
import NewRecordCard from "./NewRecordCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );

  let entertaimentExpense = 0;
  let paymentExpense = 0;
  let foodExpense = 0;

  const calculate = () => {
    data.map((item) => {
      if (item.category.name === "Entertainment")
        entertaimentExpense += item.amount;
      if (item.category.name === "Food & Drinks") foodExpense += item.amount;
      if (item.category.name === "Bills & Payments")
        paymentExpense += item.amount;
    });
  };

  useEffect(() => {
    dispatch(getRecords());
  }, []);

  calculate();
  return (
    <>
      <div className={styles.container} style={{ display: "flex" }}>
        <div className={styles.left_side}>
          <div
            style={{ display: "flex" }}
            className={styles.small_card_section}
          >
            <Card className={styles.small_card}>
              <div className={styles.small_card_div}>
                <p className={styles.red_circle} />
                <div className={styles.small_card_content}>
                  <p>Food & Drinks</p>
                  <span>$800</span>
                </div>
                <div className={styles.svg}>
                  <img src={food} alt="Entertaiment Icon" />
                </div>
              </div>
            </Card>
            <Card className={styles.small_card}>
              <div className={styles.small_card_div}>
                <p className={styles.red_circle} />
                <div className={styles.small_card_content}>
                  <p>Bills & Payments</p>
                  <span>$1200</span>
                </div>
                <div className={styles.svg}>
                  <img src={wallet} alt="Entertaiment Icon" />
                </div>
              </div>
            </Card>
            <Card className={styles.small_card}>
              <div className={styles.small_card_div}>
                <p className={styles.red_circle} />
                <div className={styles.small_card_content}>
                  <p>Entertaiment</p>
                  <span>$395</span>
                </div>
                <div className={styles.svg}>
                  <img src={movies} alt="Entertaiment Icon" />
                </div>
              </div>
            </Card>
          </div>
          <div className={styles.monthly_chart}>
            <WeeklyChart />
          </div>
        </div>

        <div className={styles.right_side}>
          <NewRecordCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
