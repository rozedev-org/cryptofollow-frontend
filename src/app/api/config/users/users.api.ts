import {
  DeletedDataResponse,
  PaginatedData,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { config } from "@/config";
import ApiHelper from "../../ApiHelper";
import { UserEntity } from "@/app/config/users/types/users.types";
import {
  CreateUserResponse,
  NewUserInterface,
  UpdateUserInterface,
  UpdateUserResponse,
} from "./types/users.api.types";

export class UsersApiHandler {
  baseUrl: string = "";
  onError: boolean = false;
  url = {
    find: () => `${this.baseUrl}/users`,
    findOne: (id: number) => `${this.baseUrl}/users/${id}`,
    create: () => `${this.baseUrl}/users`,
    delete: (id: number) => `${this.baseUrl}/users/${id}`,
    update: (id: number) => `${this.baseUrl}/users/${id}`,
  };
  constructor() {
    this.baseUrl = config.bff.url;
  }

  find = async (queryParams: PaginationParams) => {
    const apiHelper = new ApiHelper<PaginatedData<UserEntity>>();
    apiHelper.config("GET", this.url.find());
    apiHelper.addQueryParams(queryParams);
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };

  findOne = async (userId: number) => {
    const apiHelper = new ApiHelper<UserEntity>();
    apiHelper.config("GET", this.url.findOne(userId));
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };
  create = async (payload: NewUserInterface) => {
    const apiHelper = new ApiHelper<PaginatedData<CreateUserResponse>>();
    apiHelper.config("POST", this.url.create());
    apiHelper.addBody(payload);
    const response = await apiHelper.do();
    if (response.statusText !== "Created") {
      this.onError = true;
    }
    return response.data;
  };
  delete = async (userId: number) => {
    const apiHelper = new ApiHelper<DeletedDataResponse>();
    apiHelper.config("DELETE", this.url.delete(userId));
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };
  update = async (userId: number, payload: UpdateUserInterface) => {
    const apiHelper = new ApiHelper<UpdateUserResponse>();
    apiHelper.config("PUT", this.url.update(userId));
    apiHelper.addBody(payload);
    const response = await apiHelper.do();
    if (response.statusText !== "OK") {
      this.onError = true;
    }
    return response.data;
  };
}
