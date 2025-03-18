import { config } from "@/config";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
  Method,
} from "axios";

interface QueryParamsInterface {
  [key: string]: any;
}

export const instance = axios.create({
  withCredentials: true,
  baseURL: config.bff.url,
});

export default class ApiHelper<T> {
  private url: string = "";
  private method: Method = "GET";
  private params: { [key: string]: string | number } = {};
  private body: any;
  private headers: { [key: string]: string } = {};
  config(method: Method, url: string) {
    this.url = url;
    this.method = method;
  }
  addUrlParam(urlParam?: string | number) {
    this.url = `${this.url}/${urlParam}`;
  }
  addQueryParams(params: QueryParamsInterface) {
    const paramNames = Object.keys(params);
    paramNames.forEach((name) => {
      if (params[name] !== "" && params[name] !== 0)
        this.params[name] = params[name];
    });
  }
  addBody(data: any) {
    this.body = data;
  }
  addHeader(key: string, value: string) {
    this.headers[key] = value;
  }
  async do() {
    try {
      const axiosRequestConfig: AxiosRequestConfig = {
        method: this.method,
        url: this.url,
        params: this.params,
        headers: { ...this.headers },
        validateStatus: function (status) {
          return status < 500;
        },
        data: this.body,
      };

      const response = await instance<T>({ ...axiosRequestConfig });
      return response;
    } catch (e) {
      const axiosResponse: Partial<AxiosResponse<T>> = {
        status: 500,
        statusText: "Internal Server Error",
        data: undefined,
      };
      if (isAxiosError(e)) {
        axiosResponse.status = e.response?.status || 500;
        axiosResponse.statusText =
          e.response?.statusText || "Internal Server Error";
      }
      return axiosResponse;
    }
  }
}
export const apiHelper = new ApiHelper();
