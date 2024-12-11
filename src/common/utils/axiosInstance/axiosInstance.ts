import { config } from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: config.bff.url,
});
