import React from "react";
import { Form, Input, Button } from "antd";
import api from "../utils/api";
import { showError } from "../utils/messages";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Homepage from "./Homepage";
import styles from "../assets/styles/LoginAndRegister.module.scss";
import register_svg from "../assets/images/register_svg.svg";

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
    <>
      <Homepage>
        <div className={styles.content}>
          <img src={register_svg} alt="" width="600" className={styles.image} />
          <div className={styles.form}>
            <h2>Welcome To Expense.io</h2>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 11 }}
            >
              <Form.Item name="full_name">
                <Input placeholder="Full Name" className={styles.input} />
              </Form.Item>

              <Form.Item name="username" rules={[{ required: true }]}>
                <Input placeholder="Username" className={styles.input} />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ type: "email", required: true }]}
              >
                <Input placeholder="Email" className={styles.input} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                    min: 6,
                  },
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
                  Sign Up
                </Button>
              </Form.Item>
            </Form>

            <p>
              Have an account? <Link to="/login"> Login</Link>
            </p>
          </div>
        </div>
      </Homepage>
    </>
  );
}
