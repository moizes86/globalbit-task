const axios = require("axios");

axios.defaults.withCredentials = true;

const url = "http://localhost:3100";

export const register = async (data) => {
  return await axios.post(`${url}/register`, data);
};

export const login = async (data) => {
  return await axios.post(`${url}/login`, data);
};

//
export const verify = async (data) => {
  return await axios.post(`${url}/verify`, data);
};

export const getUsersToDisplay = async () => {
  const token = sessionStorage.getItem("token");
  return await axios.get(`${url}/display-users`, { headers: { token } });
};
