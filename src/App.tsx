import React, { useState } from "react";
import SignUp from "./components/SignUp";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { BiLogOut } from "react-icons/bi";
import { Route, Switch } from "react-router";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "./store/actions/userActions";
import { AppState } from "./store";
import { Link, Redirect, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Homepage from "./components/Homepage";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: AppState) => state.user);
  const { pathname } = useLocation();

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <SignUp />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/home">
          <Homepage />
        </Route>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo">
              <h2 style={{ color: "#fff", margin: "1rem 0 2rem 1.5rem" }}>
                {collapsed ? " " : "Expense.io"}
              </h2>
            </div>
            <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
              <Menu.Item key="/dashboard" icon={<BarChartOutlined />}>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="/records" icon={<PieChartOutlined />}>
                <Link to="/records">Records</Link>
              </Menu.Item>
              <Menu.Item key="/categories" icon={<DesktopOutlined />}>
                <Link to="/categories">Categories</Link>
              </Menu.Item>
              <Menu.Item key="/logout" icon={<BiLogOut />}>
                <Link to="/logout">Logout</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{ marginLeft: "1rem", fontSize: "1.25rem" }}
                  onClick={() => toggle()}
                />
              ) : (
                <MenuFoldOutlined
                  style={{ marginLeft: "1rem", fontSize: "1.25rem" }}
                  onClick={() => toggle()}
                />
              )}
              <div
                className="user"
                style={{ marginTop: "1rem", marginRight: "2rem" }}
              >
                <p
                  style={{
                    fontWeight: 500,
                    opacity: "0.7",
                    fontSize: "1rem",
                  }}
                >
                  {data.username && `Hi, ${data.full_name}`}
                </p>
              </div>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <PrivateRoute exact path="/categories" component={Categories} />
                <PrivateRoute exact path="/records" component={Records} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/" component={Dashboard} />
                {/* <Redirect from="/" to="/records" /> */}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Expense Tracker ©2021 Created by Elmir Ismayilov
            </Footer>
          </Layout>
        </Layout>
      </Switch>
    </>
  );
};

export default App;
