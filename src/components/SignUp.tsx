import React from "react";
import { Form, Input, Button } from "antd";
import api from "../utils/api";
import { showError } from "../utils/messages";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setLoading(true);
    api()
      .post("/users/register", values)
      .then((res) => {
        console.log(res.data);
        history.push("/login", { newSignUp: true });
        form.resetFields();
        setLoading(false);
      })
      .catch((err) => {
        showError(err.response.data.errorMessage);
        form.resetFields();
        setLoading(false);
      });
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 11 }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Register</h2>
      <Form.Item name="full_name" label="Full Name">
        <Input />
      </Form.Item>

      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!", min: 6 },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
