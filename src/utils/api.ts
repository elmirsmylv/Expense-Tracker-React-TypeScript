import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com",
    headers: {
      Authorization: token,
    },
  });
};
