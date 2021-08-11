import React, { useEffect } from "react";
import { Form, Input, Button, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { showError, showSuccess } from "../utils/messages";
import { AppState } from "../store";
import { LoginForm } from "../types/user";
import { login } from "../store/actions/userActions";

const Login = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const location = useLocation<{ newSignUp?: boolean }>();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: AppState) => state.user);

  const onFinish = (values: LoginForm) => {
    dispatch(login(values));
  };

  useEffect(() => {
    error && showError(error);
  }, [error]);

  useEffect(() => {
    data.username && showSuccess("You have successfully logged in!");
  }, [data.username]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/");
    }
  }, [data]);

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 11 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Login</h2>
      {location.state?.newSignUp && (
        <Result
          status="success"
          title="You successfully registered."
          subTitle="Please login with your account."
        />
      )}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
