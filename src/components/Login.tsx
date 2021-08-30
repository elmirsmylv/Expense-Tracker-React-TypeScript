import React, { useEffect } from "react";
import { Form, Input, Button, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { showError, showSuccess } from "../utils/messages";
import { AppState } from "../store";
import { LoginForm } from "../types/user";
import { login } from "../store/actions/userActions";
import styles from "../assets/styles/LoginAndRegister.module.scss";
import Homepage from "./Homepage";
import loginSvg from "../assets/images/login_svg.svg";

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
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/");
    }
  }, [data]);

  return (
    <>
      <Homepage>
        <img src={loginSvg} alt="" width="600" />
        <div className={styles.form}>
          <Form
            form={form}
            name="basic"
            layout="vertical"
            style={{ width: "250px" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            {location.state?.newSignUp && (
              <Result
                status="success"
                title="You successfully registered."
                subTitle="Please login with your account."
              />
            )}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Email" style={{ borderRadius: "7px" }} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                style={{ borderRadius: "7px" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                style={{
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Homepage>
    </>
  );
};

export default Login;
