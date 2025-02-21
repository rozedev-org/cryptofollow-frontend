import { config } from "@/config";
import { useState } from "react";
import {
  BinanceCurrency,
  CurrencyIdentity,
  newCurrency,
} from "../types/currency.types";
import {
  PaginationMeta,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { CurrencyApiHandler } from "@/app/api/currency/currency.api";

export function useCurrencies() {
  const currenciesApiHandler = new CurrencyApiHandler();
  const fetchCurrencies = async (params: PaginationParams) => {
    const response = await currenciesApiHandler.find(params);
    if (currenciesApiHandler.onError || !response) {
      cleanState();
    } else {
      const { data, meta } = response;
      handleSetNewData(data, meta);
    }
  };
  const [currency, setCurrency] = useState({
    data: [] as CurrencyIdentity[],
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
    newData: CurrencyIdentity[],
    newMeta: PaginationMeta
  ) => {
    setCurrency(() => ({
      data: newData,
      meta: newMeta,
    }));
  };
  const cleanState = () => {
    setCurrency({
      data: [] as CurrencyIdentity[],
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
    data: currency.data,
    meta: currency.meta,
    handleSetNewData,
    setCurrency,
    cleanState,
    fetchCurrencies,
  };
}

export const useCurrency = (id: number) => {
  const currencyApiHandler = new CurrencyApiHandler();
  const fetch = async () => {
    const response = await currencyApiHandler.findOne(id);
    if (currencyApiHandler.onError || !response) {
      cleanState();
    } else {
      handleSetNewData(response);
    }
  };
  const [currency, setCurrency] = useState<CurrencyIdentity>({
    id: 0,
    name: "",
    pair: "",
    price: 0,
  });
  const handleSetNewData = (newData: CurrencyIdentity) => {
    setCurrency(() => newData);
  };
  const cleanState = () => {
    setCurrency({ id: 0, name: "", pair: "", price: 0 });
  };
  return {
    data: currency,
    handleSetNewData,
    setCurrency,
    cleanState,
    fetch,
  };
};

export const useCreateCurrency = async (values: newCurrency) => {
  const currencyApiHandler = new CurrencyApiHandler();
  const create = async () => {
    const response = await currencyApiHandler.create(values);
    if (currencyApiHandler.onError || !response) {
      console.log("error");
    } else {
      console.log(response);
    }
  };
  return { create };
};
export const useUpdateCurrency = async (
  currencyId: number,
  values: CurrencyIdentity
) => {
  const currencyApiHandler = new CurrencyApiHandler();
  const update = async () => {
    const response = await currencyApiHandler.update(currencyId, values);
    if (currencyApiHandler.onError || !response) {
      console.log("error");
    } else {
      console.log(response);
    }
  };
  return { update };
};
export const useDeleteCurrency = async (currencyId: number) => {
  const currencyApiHandler = new CurrencyApiHandler();
  const create = async () => {
    const response = await currencyApiHandler.delete(currencyId);
    if (currencyApiHandler.onError || !response) {
      console.log("error");
    } else {
      console.log(response);
    }
  };
  return { create };
};

export const useBinanceCurrencies = () => {
  const fetchBinanceCurrencies = async () => {
    try {
      const { bff } = config;
      const response = await fetch(`${bff.url}/currency/binance/ticker/price`, {
        credentials: "include",
      }).then((res) => res.json());
      setCurrency(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const [currency, setCurrency] = useState<BinanceCurrency[]>([
    { symbol: "", price: "" },
  ]);

  return { fetchBinanceCurrencies, currency };
};
