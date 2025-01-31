/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useHandleData } from "@/app/states/useHandleData";
import { useCurrencies } from "../hook/useCurrencies";
import { useEffect, useState } from "react";
import { LoadItem } from "@/components/layout/loading";
import { Heading, HStack } from "@chakra-ui/react";
import { CurrencyDialogForm } from "./currency-form";
import { PaginatedTable } from "@/components/Table/PaginatedTable/PaginatedTable";
import { CurrencyColumns } from "../types/currency.types";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { Button } from "@/components/ui/button";

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
        <>
          <HStack mr={"auto"} mb={"35px"}>
            <Heading>Monedas</Heading>
            <CurrencyDialogForm />
          </HStack>
          <PaginatedTable
            meta={currency.meta}
            data={currency.data}
            handlePageChange={handlePageChange}
            handlePerRowsChange={handlePerRowsChange}
            columns={CurrencyColumns}
            isLoadingData={isLoadingData}
          />
        </>
      )}
    </>
  );
};
