import { config } from "@/config";
import axios from "axios";

export const axiosInstace = axios.create({
  withCredentials: true,
  //   baseURL: config.bff.url,
  baseURL: "http://localhost:8000/api/cryptofollow-service/v1",
});
