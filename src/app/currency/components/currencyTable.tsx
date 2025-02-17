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

export const CurrencyTable = () => {
  const { handleRefreshSignal, refreshSignal } = useHandleData();
  const { currency, fetchCurrencies } = useCurrencies();

  //Todo esto se ira para un componente de constantes o algo
  const [perPage, setPerPage] = useState(5);
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
    fetchData(1);
    console.log(currency);
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
            meta={currency.meta}
            data={currency.data}
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
