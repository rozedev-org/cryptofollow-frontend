import { useState } from "react";
import { config } from "@/config";
import {
  PaginationMeta,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { useForm } from "react-hook-form";
import { useHandleData } from "@/app/states/useHandleData";
import { toast } from "sonner";
import { InvestmentApiHandler } from "@/app/api/investments/investments.api";
import { NewInvestInterface } from "@/app/api/investments/types/investments.api.types";
import { InvestmentIdentity } from "../types/investment.types";

export function useInvestments() {
  const investmentApiHandler = new InvestmentApiHandler();
  const fetch = async (params: PaginationParams) => {
    const response = await investmentApiHandler.find(params);
    if (investmentApiHandler.onError || !response) {
      cleanState();
    } else {
      const { data, meta } = response;
      handleSetNewData(data, meta);
    }
  };
  const [invest, setInvest] = useState({
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
  const handleSetNewData = (
    newData: InvestmentIdentity[],
    newMeta: PaginationMeta
  ) => {
    setInvest(() => ({
      data: newData,
      meta: newMeta,
    }));
  };
  const cleanState = () => {
    setInvest({
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
  };
  return {
    data: invest.data,
    meta: invest.meta,
    handleSetNewData,
    setInvest,
    cleanState,
    fetch,
  };
}

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

export const useCreateInvestmentOld = async (values: NewInvestInterface) => {
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

export const useCreateInvestment = (userId: number) => {
  const { setIsCreating, handleRefreshSignal } = useHandleData();

  const investmentForm = useForm<NewInvestInterface>({
    defaultValues: {
      buyPrice: 0,
      currencyId: 0,
      currencyInvestment: 0,
      userId,
    },
  });

  const onSubmit = investmentForm.handleSubmit(async (values) => {
    setIsCreating(true);
    try {
      const { bff } = config;
      const response = await fetch(`${bff.url}/investments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      toast.success(`Se ha creado una inversion`);
      console.log(response);
      handleRefreshSignal(true);
      setIsCreating(false);
    } catch (error) {
      toast.error("Ha ocurrido un error al crear la inversion");
      console.log(error);
      setIsCreating(false);
    }
  });

  return { investmentForm, onSubmit };
};
