import {
  DeletedDataResponse,
  PaginatedData,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { config } from "@/config";
import ApiHelper from "../ApiHelper";
import { CurrencyIdentity } from "@/app/currency/types/currency.types";
import {
  CreateCurrencyResponse,
  NewCurrencyInterface,
  UpdateCurrencyInterface,
  UpdateCurrencyResponse,
} from "./types/currency.api.types";

export class CurrencyApiHandler {
  baseUrl: string = "";
  onError: boolean = false;
  url = {
    find: () => `${this.baseUrl}/currency`,
    findOne: (id: number) => `${this.baseUrl}/currency/${id}`,
    create: () => `${this.baseUrl}/currency`,
    delete: (id: number) => `${this.baseUrl}/currency/${id}`,
    update: (id: number) => `${this.baseUrl}/currency/${id}`,
  };
  constructor() {
    this.baseUrl = config.bff.url;
  }

  find = async (queryParams: PaginationParams) => {
    const apiHelper = new ApiHelper<PaginatedData<CurrencyIdentity>>();
    apiHelper.config("GET", this.url.find());
    apiHelper.addQueryParams(queryParams);
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };

  findOne = async (currencyId: number) => {
    const apiHelper = new ApiHelper<CurrencyIdentity>();
    apiHelper.config("GET", this.url.findOne(currencyId));
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };
  create = async (payload: NewCurrencyInterface) => {
    const apiHelper = new ApiHelper<PaginatedData<CreateCurrencyResponse>>();
    apiHelper.config("POST", this.url.create());
    apiHelper.addBody(payload);
    const response = await apiHelper.do();
    if (response.statusText !== "Created") {
      this.onError = true;
    }
    return response.data;
  };
  delete = async (currencyId: number) => {
    const apiHelper = new ApiHelper<DeletedDataResponse>();
    apiHelper.config("DELETE", this.url.delete(currencyId));
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };
  update = async (currencyId: number, payload: UpdateCurrencyInterface) => {
    const apiHelper = new ApiHelper<UpdateCurrencyResponse>();
    apiHelper.config("PUT", this.url.update(currencyId));
    apiHelper.addBody(payload);
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };
}
