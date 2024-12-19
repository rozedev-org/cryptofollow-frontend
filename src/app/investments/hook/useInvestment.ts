import { useState } from "react";
import { InvestmentIdentity } from "../types/crypto.types";

export const useInvestments = () => {
  const fetchInvestments = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/cryptofollow-service/v1/investments"
      ).then((res) => res.json());
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
      const response = await fetch(
        `http://localhost:8000/api/cryptofollow-service/v1/investments/${id}`
      ).then((res) => res.json());
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
  });

  return { fetchInvest, invest, setInvest };
};
