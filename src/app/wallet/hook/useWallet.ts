import { useEffect, useState } from "react";
import { BalanceIdentity, WalletIdentity } from "../types/wallet.types";
import {
  PaginationMeta,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { WalletApiHandler } from "@/app/api/wallet/wallet.api";

export const useWallet = () => {
  const walletApiHandler = new WalletApiHandler();
  const fetchWallet = async (params: PaginationParams) => {
    const response = await walletApiHandler.findCurrencies(params);

    console.log("response :>> ", response);
    console.log("walletApiHandler :>> ", walletApiHandler);
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

  useEffect(() => {
    console.log("wallet :>> ", wallet);
  }, [wallet]);

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
export const useBalance = () => {
  const BalanceApiHandler = new WalletApiHandler();
  const fetchBalance = async () => {
    const response = await BalanceApiHandler.findBalance();
    if (BalanceApiHandler.onError || !response) {
      cleanState();
    } else {
      handleSetNewData(response);
    }
  };
  const [balance, setBalance] = useState({
    balance: 0,
    variation: 0,
  });
  const handleSetNewData = (newData: BalanceIdentity) => {
    setBalance(newData);
  };
  const cleanState = () => {
    setBalance({
      balance: 0,
      variation: 0,
    });
  };
  return {
    data: balance,
    handleSetNewData,
    setBalance,
    cleanState,
    fetchBalance,
  };
};
