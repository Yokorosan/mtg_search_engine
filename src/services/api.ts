import axios from "axios";
export const instance = axios.create({
  baseURL: "https://api.scryfall.com/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
