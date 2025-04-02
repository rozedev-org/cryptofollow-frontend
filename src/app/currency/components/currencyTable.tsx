/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useHandleData } from "@/app/states/useHandleData";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { LoadItem } from "@/components/layout/loading";
import { PaginatedTable } from "@/components/Table/PaginatedTable/PaginatedTable";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCurrencies } from "../hook/useCurrencies";
import { CurrencyColumns } from "../types/currency.types";
import { CurrencyDialogForm } from "./currency-form";
import { GuideCurrencyButton } from "./currency-guide-button";
import { useUserSession } from "@/app/states/useUserId";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/appRoutes";

export const CurrencyTable = () => {
  const { userLogged } = useUserSession();
  const { handleRefreshSignal, refreshSignal } = useHandleData();
  const { currency, fetchCurrencies } = useCurrencies();
  const { data, meta } = currency;
  const router = useRouter();
  //Todo esto se ira para un componente de constantes o algo
  const [perPage, setPerPage] = useState(10);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const fetchData = async (page: number) => {
    setIsLoadingData(true);

    const queryPamas: PaginationParams = {
      page,
      take: perPage,
    };

    await fetchCurrencies(queryPamas);
    setIsLoadingPage(false);
    setIsLoadingData(false);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    fetchData(selectedItem.selected + 1);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setIsLoadingData(true);
    const queryPamas = {
      page,
      take: newPerPage,
    };
    await fetchCurrencies(queryPamas);

    setPerPage(newPerPage);
    setIsLoadingData(false);
  };

  useEffect(() => {
    if (userLogged.role == "USER") {
      router.push(appRoutes.home.url());
    } else {
      fetchData(1);
    }
  }, []);

  useEffect(() => {
    if (refreshSignal) {
      setIsLoadingData(true);
      fetchData(1);
      handleRefreshSignal(false);
    }
  }, [refreshSignal]);

  return (
    <>
      {isLoadingPage && <LoadItem />}
      {!isLoadingPage && (
        <VStack w={"100%"} id="base">
          <HStack mr={"auto"} mb={"35px"}>
            <Heading>Monedas</Heading>
            <CurrencyDialogForm />
            <GuideCurrencyButton />
          </HStack>
          <PaginatedTable
            meta={meta}
            data={data}
            handlePageChange={handlePageChange}
            handlePerRowsChange={handlePerRowsChange}
            columns={CurrencyColumns}
            isLoadingData={isLoadingData}
          />
        </VStack>
      )}
    </>
  );
};
