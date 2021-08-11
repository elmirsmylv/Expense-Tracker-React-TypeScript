import { message } from "antd";

export const showError = (errorMessage: string) => {
  message.error(errorMessage);
};

export const showSuccess = (errorMessage: string) => {
  message.success(errorMessage);
};
