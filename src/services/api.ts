import axios from "axios";
export const instance = axios.create({
  baseURL: "http://api.magicthegathering.io/v1/",
  timeout: 7000,
  headers: { "Content-Type": "application/json" },
});
