const axios = require("axios");

const url = "http://localhost:3100";

export const register = async (data) => {
  return await axios.post(`${url}/register`, data);
};

export const login = async (data) => {
  return await axios.post(`${url}/login`, data);
};