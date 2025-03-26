import {
  PaginatedData,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { config } from "@/config";
import ApiHelper from "../ApiHelper";
import { BalanceResponse, WalletResponse } from "./types/wallet.api.types";

export class WalletApiHandler {
  baseUrl: string = "";
  onError: boolean = false;
  url = {
    find: () => `${this.baseUrl}/wallet`,
    findCurrencies: () => `${this.baseUrl}/wallet/currencies`,
  };
  constructor() {
    this.baseUrl = config.bff.url;
  }

  findBalance = async () => {
    const apiHelper = new ApiHelper<PaginatedData<BalanceResponse>>();
    apiHelper.config("GET", this.url.find());
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };

  findCurrencies = async (queryParams: PaginationParams) => {
    const apiHelper = new ApiHelper<PaginatedData<WalletResponse>>();
    console.log("object :>> ", this.url.findCurrencies());
    apiHelper.config("GET", this.url.findCurrencies());
    apiHelper.addQueryParams(queryParams);
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };
}
