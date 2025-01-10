import { useState } from "react";
import { InvestmentIdentity, newInvestment } from "../types/crypto.types";
import { config } from "@/config";

export const useInvestments = () => {
  const fetchInvestments = async () => {
    try {
      const { bff } = config;
      setIsLoading(true);
      const response = await fetch(`${bff.url}/investments`, {
        credentials: "include",
      }).then((res) => res.json());
      setInvest(response || []);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const [invest, setInvest] = useState<InvestmentIdentity[]>([]);
  const [refreshSignal, setRefreshSignal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleRefreshSignal = (value: boolean) => setRefreshSignal(value);

  return {
    invest,
    fetchInvestments,
    refreshSignal,
    handleRefreshSignal,
    isLoading,
  };
};

export const useInvestment = (id: number) => {
  const fetchInvest = async () => {
    setIsLoading(true);
    try {
      const { bff } = config;

      const response = await fetch(`${bff.url}/investments/${id}`, {
        credentials: "include",
      }).then((res) => res.json());
      setInvest(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  const [invest, setInvest] = useState<InvestmentIdentity>({
    id: 0,
    buyPrice: 0,
    currency: {
      id: 0,
      name: "",
      price: 0,
    },
    currencyId: 0,
    currencyInvestment: 0,
    pairAmount: 0,
    pairInvestment: 0,
    pairVariation: 0,
    percentageVariation: 0,
    userId: 0,
  });

  return { fetchInvest, invest, setInvest, isLoading };
};

export const useCreateInvestment = async (values: newInvestment) => {
  try {
    const { bff } = config;

    const response = await fetch(`${bff.url}/investments`, {
      method: "POST",
      body: JSON.stringify(values),
      credentials: "include",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
