import { useState } from "react";
import { WalletIdentity } from "../types/wallet.types";
import { config } from "@/config";
import {
  PaginatedResponse,
  PaginationParams,
} from "@/common/interfaces/response.interface";

export const useWallet = () => {
  const fetchWallet = async (params: PaginationParams) => {
    try {
      const { bff } = config;
      setIsLoading(true);
      const { page, take } = params;
      const response = await fetch(
        `${bff.url}/wallet/currencies?page=${page}&take=${take}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json() as Promise<PaginatedResponse<WalletIdentity>>);

      setWallet(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState<PaginatedResponse<WalletIdentity>>({
    data: [] as WalletIdentity[],
    meta: {
      page: 0,
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: true,
    },
  });

  return {
    wallet,
    fetchWallet,
    isLoading,
  };
};
