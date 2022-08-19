import axios from "axios";

export const api = axios.create({
  baseURL: "https://json-server-capstone.herokuapp.com",
});

export const api2 = axios.create({
  baseURL: "http://localhost:8000",
});
