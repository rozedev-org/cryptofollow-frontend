import { useState } from "react";
import { config } from "@/config";
import {
  PaginatedResponse,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { InvestmentIdentity, newInvestment } from "../types/investment.types";

export const useInvestments = () => {
  const fetchInvestments = async (params: PaginationParams) => {
    try {
      const { bff } = config;
      setIsLoading(true);
      const { page, take } = params;
      const response = await fetch(
        `${bff.url}/investments?page=${page}&take=${take}`,
        {
          credentials: "include",
        }
      ).then(
        (res) => res.json() as Promise<PaginatedResponse<InvestmentIdentity>>
      );

      setInvest(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const [invest, setInvest] = useState<PaginatedResponse<InvestmentIdentity>>({
    data: [] as InvestmentIdentity[],
    meta: {
      page: 0,
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: true,
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  return {
    invest,
    fetchInvestments,
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
      pair: "",
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
