import { CurrencyApiHandler } from "@/app/api/currency/currency.api";
import {
  PaginatedResponse,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { config } from "@/config";
import { useState } from "react";
import { BinanceCurrency, CurrencyIdentity } from "../types/currency.types";
import { useForm } from "react-hook-form";
import { useHandleData } from "@/app/states/useHandleData";
import { toast } from "sonner";
import {
  NewCurrencyInterface,
  UpdateCurrencyInterface,
} from "@/app/api/currency/types/currency.api.types";

// export function useCurrencies() {
//   const currenciesApiHandler = new CurrencyApiHandler();
//   const fetchCurrencies = async (params: PaginationParams) => {
//     const response = await currenciesApiHandler.find(params);
//     if (currenciesApiHandler.onError || !response) {
//       cleanState();
//     } else {
//       const { data, meta } = response;
//       handleSetNewData(data, meta);
//     }
//   };
//   const [currency, setCurrency] = useState({
//     data: [] as CurrencyIdentity[],
//     meta: {
//       page: 0,
//       take: 0,
//       itemCount: 0,
//       pageCount: 0,
//       hasPreviousPage: false,
//       hasNextPage: true,
//     },
//   });
//   const handleSetNewData = (
//     newData: CurrencyIdentity[],
//     newMeta: PaginationMeta
//   ) => {
//     setCurrency(() => ({
//       data: newData,
//       meta: newMeta,
//     }));
//   };
//   const cleanState = () => {
//     setCurrency({
//       data: [] as CurrencyIdentity[],
//       meta: {
//         page: 0,
//         take: 0,
//         itemCount: 0,
//         pageCount: 0,
//         hasPreviousPage: false,
//         hasNextPage: true,
//       },
//     });
//   };
//   return {
//     data: currency.data,
//     meta: currency.meta,
//     handleSetNewData,
//     setCurrency,
//     cleanState,
//     fetchCurrencies,
//   };
// }

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

// export const useCreateCurrency = async (values: newCurrency) => {
//   const currencyApiHandler = new CurrencyApiHandler();
//   const create = async () => {
//     const response = await currencyApiHandler.create(values);
//     if (currencyApiHandler.onError || !response) {
//       console.log("error");
//     } else {
//       console.log(response);
//     }
//   };
//   return { create };
// };
// export const useUpdateCurrency = async (
//   currencyId: number,
//   values: CurrencyIdentity
// ) => {
//   const currencyApiHandler = new CurrencyApiHandler();
//   const update = async () => {
//     const response = await currencyApiHandler.update(currencyId, values);
//     if (currencyApiHandler.onError || !response) {
//       console.log("error");
//     } else {
//       console.log(response);
//     }
//   };
//   return { update };
// };

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
export const useCreateCurrency = (setOpen: (open: boolean) => void) => {
  const { setIsCreating, handleRefreshSignal } = useHandleData();

  const currencyForm = useForm<NewCurrencyInterface>({
    defaultValues: {
      name: "",
      price: 0,
      pair: "",
    },
  });

  const onSubmit = currencyForm.handleSubmit(async (values) => {
    console.log(values);
    setIsCreating(true);
    try {
      const { bff } = config;
      const response = await fetch(`${bff.url}/currency`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      toast.success(`Se ha creado una moneda con éxito`);
      console.log(response);
      handleRefreshSignal(true);
      setIsCreating(false);
      setOpen(false);
    } catch (error) {
      toast.error("Ha ocurrido un error al crear una moneda");
      console.log(error);
      setIsCreating(false);
      setOpen(false);
    }
  });

  return { currencyForm, onSubmit };
};

export const useUpdateCurrency = (
  data: CurrencyIdentity,
  setOpen: (open: boolean) => void
) => {
  const { setIsCreating, handleRefreshSignal } = useHandleData();

  const updateCurrencyForm = useForm<UpdateCurrencyInterface>({
    defaultValues: {
      name: data.name,
      pair: data.pair,
      price: data.price,
    },
  });

  const onSubmit = updateCurrencyForm.handleSubmit(async (values) => {
    setIsCreating(true);
    try {
      const { bff } = config;
      const response = await fetch(`${bff.url}/currency/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      toast.success(`Se ha Actualizado una Moneda con éxito`);
      console.log(response);
      handleRefreshSignal(true);
      setIsCreating(false);
      setOpen(false);
    } catch (error) {
      toast.error("Ha ocurrido un error al actualizar la Moneda");
      console.log(error);
      setIsCreating(false);
    }
  });

  return { updateCurrencyForm, onSubmit };
};
