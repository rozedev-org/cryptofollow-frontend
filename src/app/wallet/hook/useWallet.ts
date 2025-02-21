import { useState } from "react";
import { WalletIdentity } from "../types/wallet.types";
import {
  PaginationMeta,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { WalletApiHandler } from "@/app/api/wallet/wallet.api";

export const useWallet = () => {
  const walletApiHandler = new WalletApiHandler();
  const fetchWallet = async (params: PaginationParams) => {
    const response = await walletApiHandler.findCurrencies(params);
    if (walletApiHandler.onError || !response) {
      cleanState();
    } else {
      const { data, meta } = response;
      handleSetNewData(data, meta);
    }
  };
  const [wallet, setWallet] = useState({
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
  const handleSetNewData = (
    newData: WalletIdentity[],
    newMeta: PaginationMeta
  ) => {
    setWallet(() => ({
      data: newData,
      meta: newMeta,
    }));
  };
  const cleanState = () => {
    setWallet({
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
  };
  return {
    data: wallet.data,
    meta: wallet.meta,
    handleSetNewData,
    setWallet,
    cleanState,
    fetchWallet,
  };
};
