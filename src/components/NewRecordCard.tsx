import { CalendarOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Button, Card, Input, Select, Form, Modal } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiWallet3Line } from "react-icons/ri";

import styles from "../assets/styles/NewRecordCard.module.scss";
import { AppState } from "../store";
import { addRecord, getRecords } from "../store/actions/recordActions";
import { useState } from "react";
import { RecordForm } from "../types/record";
import { getCategories } from "../store/actions/categoryActions";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

const NewRecordCard = () => {
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );
  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    dispatch(addRecord(form));
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getRecords());
    dispatch(getCategories());
  }, []);

  const dataLength = data.slice(-5);
  console.log(dataLength);

  return (
    <>
      <Modal
        title="Create new record"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 15 }}>
          <Form.Item label="Title">
            <Input
              name="name"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Amount">
            <Input
              name="amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
            />
          </Form.Item>

          <Form.Item
            label="Category"
            tooltip="You have to create new category if your category is not there."
          >
            <Select
              defaultValue={form.category_id}
              value={form.category_id}
              onChange={(category_id) => setForm({ ...form, category_id })}
            >
              <Select.Option value={0} disabled>
                Select a category
              </Select.Option>
              {categories.map((category) => {
                return (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Card className={styles.card}>
        <div className={styles.title_section}>
          <p>
            <CalendarOutlined />
            <span>Your Transaction History</span>
          </p>
          <div className={styles.hr} />
        </div>
        <div className={styles.records}>
          {dataLength.map((item) => (
            <div className={styles.record}>
              <div className={styles.infos}>
                <DollarCircleOutlined className={styles.dollar_icon} />
                <div className={styles.title_date}>
                  <p className={styles.record_title}>{item.title}</p>
                  <p className={styles.record_date}>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span
                style={
                  item.category.type === "income"
                    ? { color: "#41A37D" }
                    : { color: "#CA3A4F" }
                }
                className={styles.amount}
              >
                ${item.amount}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.add_new}>
          <div className={styles.hr} />
          <div className={styles.content}>
            <div className={styles.logo_section}>
              <RiWallet3Line
                style={{ fontSize: "2rem", opacity: "0.7" }}
                className={styles.wallet_icon}
              />
              <p>Mising Transaction?</p>
            </div>
            <div className={styles.button_section}>
              <div className={styles.new_record_icon}></div>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Add New
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default NewRecordCard;
