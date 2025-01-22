import {
  CurrencyIdentity,
  newCurrency,
} from "@/app/investments/types/investment.types";
import { config } from "@/config";
import { useState } from "react";

export const useCurrencies = () => {
  const fetchCurrencies = async () => {
    setIsLoading(true);
    try {
      const { bff } = config;
      const response = await fetch(`${bff.url}/currency`, {
        credentials: "include",
      }).then((res) => res.json());
      setIsLoading(false);
      setCurrency(response || []);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const [currency, setCurrency] = useState<CurrencyIdentity[]>([]);
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
