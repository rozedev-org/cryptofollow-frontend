import {
  PaginatedData,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { config } from "@/config";
import ApiHelper from "../ApiHelper";
import {
  BalanceIdentity,
  WalletIdentity,
} from "@/app/wallet/types/wallet.types";

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
    const apiHelper = new ApiHelper<PaginatedData<BalanceIdentity>>();
    apiHelper.config("GET", this.url.find());
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };

  findCurrencies = async (queryParams: PaginationParams) => {
    const apiHelper = new ApiHelper<PaginatedData<WalletIdentity>>();
    apiHelper.config("GET", this.url.findCurrencies());
    apiHelper.addQueryParams(queryParams);
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };
}
