import { config } from "@/config";
import { useState } from "react";
import {
  BinanceCurrency,
  CurrencyIdentity,
  newCurrency,
} from "../types/currency.types";
import {
  PaginatedResponse,
  PaginationParams,
} from "@/common/interfaces/response.interface";

export const useCurrencies = () => {
  const fetchCurrencies = async (params: PaginationParams) => {
    try {
      const { bff } = config;
      setIsLoading(true);
      const { page, take, getAll } = params;
      const response = await fetch(
        `${bff.url}/currency?page=${page}&take=${take}&getAll=${getAll}`,
        {
          credentials: "include",
        }
      ).then(
        (res) => res.json() as Promise<PaginatedResponse<CurrencyIdentity>>
      );
      setCurrency(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const [currency, setCurrency] = useState<PaginatedResponse<CurrencyIdentity>>(
    {
      data: [] as CurrencyIdentity[],
      meta: {
        page: 0,
        take: 0,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: true,
      },
    }
  );
  const [isLoading, setIsLoading] = useState(true);

  return {
    fetchCurrencies,
    isLoading,
    currency,
  };
};

export const useCurrency = (id: number) => {
  const fetchCurrency = async () => {
    setIsLoading(true);
    try {
      const { bff } = config;
      const response = await fetch(`${bff.url}/currency/${id}`, {
        credentials: "include",
      }).then((res) => res.json());
      setCurrency(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState<CurrencyIdentity>();

  return {
    fetchCurrency,
    currency,
    setCurrency,
    isLoading,
  };
};

export const useCreateCurrency = async (values: newCurrency) => {
  try {
    const { bff } = config;
    const response = await fetch(`${bff.url}/currency`, {
      method: "POST",
      body: JSON.stringify(values),
      credentials: "include",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
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
