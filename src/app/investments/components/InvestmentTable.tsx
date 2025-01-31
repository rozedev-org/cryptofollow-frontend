/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useHandleData } from "@/app/states/useHandleData";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { PaginatedTable } from "@/components/Table/PaginatedTable/PaginatedTable";
import { LoadItem } from "@/components/layout/loading";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInvestments } from "../hook/useInvestment";
import { InvestmentsColumns } from "../types/investment.types";
import { InvestmentDialogForm } from "./dialog-form";

export const InvestmentTable = () => {
  const { refreshSignal, handleRefreshSignal } = useHandleData();
  const { fetchInvestments, invest } = useInvestments();
  const [perPage, setPerPage] = useState(5);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const fetchData = async (page: number) => {
    setIsLoadingData(true);

    const queryPamas: PaginationParams = {
      page,
      take: perPage,
    };

    await fetchInvestments(queryPamas);
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
    await fetchInvestments(queryPamas);

    setPerPage(newPerPage);
    setIsLoadingData(false);
  };

  useEffect(() => {
    fetchData(1);
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
        <VStack w={"100%"}>
          <HStack mr={"auto"} mb={"35px"}>
            <Heading>Inversiones</Heading>
            <InvestmentDialogForm />
          </HStack>
          <PaginatedTable
            meta={invest.meta}
            data={invest.data}
            handlePageChange={handlePageChange}
            handlePerRowsChange={handlePerRowsChange}
            columns={InvestmentsColumns}
            isLoadingData={isLoadingData}
          />
        </VStack>
      )}
    </>
  );
};
