import { InvestmentApiHandler } from "@/app/api/investments/investments.api";
import { NewInvestInterface } from "@/app/api/investments/types/investments.api.types";
import { useHandleData } from "@/app/states/useHandleData";
import {
  PaginationMeta,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { config } from "@/config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InvestmentIdentity } from "../types/investment.types";

export function useInvestments() {
  const investmentApiHandler = new InvestmentApiHandler();
  const fetchInvestments = async (params: PaginationParams) => {
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
    invest,
    handleSetNewData,
    setInvest,
    cleanState,
    fetchInvestments,
  };
}
// export const useInvestments = () => {
//   const fetchInvestments = async (params: PaginationParams) => {
//     try {
//       const { bff } = config;
//       setIsLoading(true);
//       const { page, take } = params;
//       const response = await fetch(
//         `${bff.url}/investments?page=${page}&take=${take}`,
//         {
//           credentials: "include",
//         }
//       ).then(
//         (res) => res.json() as Promise<PaginatedResponse<InvestmentIdentity>>
//       );

//       setInvest(response);
//       setIsLoading(false);
//       return response;
//     } catch (error) {
//       setIsLoading(false);
//       console.log(error);
//     }
//   };

//   const [invest, setInvest] = useState<PaginatedResponse<InvestmentIdentity>>({
//     data: [] as InvestmentIdentity[],
//     meta: {
//       page: 0,
//       take: 0,
//       itemCount: 0,
//       pageCount: 0,
//       hasPreviousPage: false,
//       hasNextPage: true,
//     },
//   });

//   const [isLoading, setIsLoading] = useState(true);

//   return {
//     invest,
//     fetchInvestments,
//     isLoading,
//   };
// };

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
