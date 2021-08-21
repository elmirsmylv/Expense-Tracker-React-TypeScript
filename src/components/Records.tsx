import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Form, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { addRecord, getRecords } from "../store/actions/recordActions";
import { Category } from "../types/category";
import { Record, RecordForm } from "../types/record";
import { Mode } from "../types/app";
import { getCategories } from "../store/actions/categoryActions";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

const Records = () => {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );
  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );

  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [id, setId] = useState(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    console.log(form);
    dispatch(addRecord(form));
    setIsModalVisible(false);
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setForm(emptyForm);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"], record: Record) => {
        return (
          <>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => {
        return (
          <>
            {new Date(updatedAt).toLocaleDateString()}{" "}
            {new Date(updatedAt).toLocaleTimeString("az-AZ", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => (
        <Space size="middle">
          <EditOutlined style={{ color: "#00c7b0" }} onClick={() => {}} />
          <DeleteOutlined style={{ color: "#c70d00" }} onClick={() => {}} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getRecords());
    dispatch(getCategories());
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "0.8rem",
          }}
          className="button"
        >
          <Button onClick={() => showModal("new")} type="primary">
            New Record
          </Button>
        </div>
        <Modal
          title={
            mode === "new"
              ? "Create new category"
              : mode === "edit"
              ? "Update category"
              : mode === "delete"
              ? "Delete category"
              : null
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          //   okButtonProps={{ disabled: !(mode === "delete") && !form.name }}
        >
          {mode === "new" || mode === "edit" ? (
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

              <Form.Item label="Category">
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
          ) : mode === "delete" ? (
            <>Are you sure?</>
          ) : null}
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} />;
    </>
  );
};

export default Records;
