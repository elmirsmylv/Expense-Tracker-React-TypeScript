import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppState } from "../store";
import { logout } from "../store/actions/userActions";

const Logout = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    dispatch(logout());
  }, []);

  if (!data.username) return <Redirect to="login" />;

  return <div>Logout...</div>;
};

export default Logout;
