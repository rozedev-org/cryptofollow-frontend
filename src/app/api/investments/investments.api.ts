import {
  PaginationParams,
  PaginatedData,
  DeletedDataResponse,
} from "@/common/interfaces/response.interface";
import { config } from "@/config";
import ApiHelper from "../ApiHelper";
import {
  CreateInvestResponse,
  NewInvestInterface,
  UpdateInvestmentInterface,
  UpdateInvestResponse,
} from "./types/investments.api.types";
import { InvestmentIdentity } from "@/app/investments/types/investment.types";

export class InvestmentApiHandler {
  baseUrl: string = "";
  onError: boolean = false;
  url = {
    find: () => `${this.baseUrl}/investments`,
    findOne: (id: number) => `${this.baseUrl}/investments/${id}`,
    create: () => `${this.baseUrl}/investments`,
    delete: (id: number) => `${this.baseUrl}/investments/${id}`,
    update: (id: number) => `${this.baseUrl}/investments/${id}`,
  };
  constructor() {
    this.baseUrl = config.bff.url;
  }

  find = async (queryParams: PaginationParams) => {
    const apiHelper = new ApiHelper<PaginatedData<InvestmentIdentity>>();
    apiHelper.config("GET", this.url.find());
    apiHelper.addQueryParams(queryParams);
    const response = await apiHelper.do();
    if (response.status !== 200) {
      this.onError = true;
    }
    return response.data;
  };

  findOne = async (investId: number) => {
    const apiHelper = new ApiHelper<InvestmentIdentity>();
    apiHelper.config("GET", this.url.findOne(investId));
    const response = await apiHelper.do();
    if (response.status !== 200) {
      this.onError = true;
    }
    return response.data;
  };
  create = async (payload: NewInvestInterface) => {
    const apiHelper = new ApiHelper<PaginatedData<CreateInvestResponse>>();
    apiHelper.config("POST", this.url.create());
    apiHelper.addBody(payload);
    const response = await apiHelper.do();
    if (response.statusText !== "Created") {
      this.onError = true;
    }
    return response.data;
  };
  delete = async (investId: number) => {
    const apiHelper = new ApiHelper<DeletedDataResponse>();
    apiHelper.config("DELETE", this.url.delete(investId));
    const response = await apiHelper.do();
    if (response.status !== 200) {
      this.onError = true;
    }
    return response.data;
  };
  update = async (investId: number, payload: UpdateInvestmentInterface) => {
    const apiHelper = new ApiHelper<UpdateInvestResponse>();
    apiHelper.config("PUT", this.url.update(investId));
    apiHelper.addBody(payload);
    const response = await apiHelper.do();
    if (response.status !== 200) {
      this.onError = true;
    }
    return response.data;
  };
}
