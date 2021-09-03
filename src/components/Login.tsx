import React, { useEffect } from "react";
import { Form, Input, Button, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";

import { showError, showSuccess } from "../utils/messages";
import { AppState } from "../store";
import { LoginForm } from "../types/user";
import { login } from "../store/actions/userActions";
import styles from "../assets/styles/LoginAndRegister.module.scss";
import Homepage from "./Homepage";
import loginSvg from "../assets/images/login_svg2.svg";

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
        <div className={styles.content}>
          <img src={loginSvg} alt="" width="600" className={styles.image} />
          <div className={styles.form}>
            <h2>Welcome Back To Expense.io</h2>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              style={{ width: "250px" }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Email" className={styles.input} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className={styles.button}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <p>
              Don't have an account? <Link to="/register"> Register</Link>
            </p>
          </div>
        </div>
      </Homepage>
    </>
  );
};

export default Login;
