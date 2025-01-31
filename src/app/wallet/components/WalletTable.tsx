/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useWallet } from "../hook/useWallet";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { LoadItem } from "@/components/layout/loading";
import { PaginatedTable } from "@/components/Table/PaginatedTable/PaginatedTable";
import { WalletColumns } from "../types/wallet.types";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { useHandleData } from "@/app/states/useHandleData";

export const WalletTable = () => {
  const { refreshSignal, handleRefreshSignal } = useHandleData();
  const { fetchWallet, wallet } = useWallet();
  const [perPage, setPerPage] = useState(5);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const fetchData = async (page: number) => {
    setIsLoadingData(true);

    const queryPamas: PaginationParams = {
      page,
      take: perPage,
    };

    await fetchWallet(queryPamas);
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
    await fetchWallet(queryPamas);

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
            <Heading>Billetera</Heading>
          </HStack>
          <PaginatedTable
            meta={wallet.meta}
            data={wallet.data}
            handlePageChange={handlePageChange}
            handlePerRowsChange={handlePerRowsChange}
            columns={WalletColumns}
            isLoadingData={isLoadingData}
          />
        </VStack>
      )}
    </>
  );
};
