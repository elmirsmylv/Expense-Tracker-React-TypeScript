import { LoginForm, User } from "../../types/user";
import { UserDispatch } from "../../types/user";
import api from "../../utils/api";
import { showError, showSuccess } from "../../utils/messages";

export const login = (creds: LoginForm) => async (dispatch: UserDispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await api().post<User>("users/login", creds);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("token", response.data.token);
    showSuccess("You have successfully logged in!");
  } catch {
    dispatch({ type: "LOGIN_ERROR" });
    showError("Login failed");
  }
};

export const isLoggedIn = () => async (dispatch: UserDispatch) => {
  dispatch({ type: "IS_LOGGED_IN_START" });
  try {
    const response = await api().post<User>("/users/is_logged_in");
    dispatch({ type: "IS_LOGGED_IN_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "IS_LOGGED_IN_ERROR" });
  }
};

export const logout = () => (dispatch: UserDispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};
