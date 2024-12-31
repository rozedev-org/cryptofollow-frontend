import { useState } from "react";
import { InvestmentIdentity, newInvestment } from "../types/crypto.types";
import { config } from "@/config";

export const useInvestments = () => {
  const fetchInvestments = async () => {
    try {
      const { bff } = config;

      const response = await fetch(`${bff.url}/investments`, {
        credentials: "include",
      }).then((res) => res.json());
      setInvest(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const [invest, setInvest] = useState<InvestmentIdentity[]>([]);

  return {
    invest,
    fetchInvestments,
  };
};

export const useInvestment = (id: number) => {
  const fetchInvest = async () => {
    try {
      const { bff } = config;

      const response = await fetch(`${bff.url}/investments/${id}`, {
        credentials: "include",
      }).then((res) => res.json());
      setInvest(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
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

  return { fetchInvest, invest, setInvest };
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
