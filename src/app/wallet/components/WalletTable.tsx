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
import { GuideWalletButton } from "./wallet-guide-button";

export const WalletTable = () => {
  const { refreshSignal, handleRefreshSignal } = useHandleData();
  const { data, meta, fetchWallet } = useWallet();
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
        <VStack w={"100%"} id="base">
          <HStack mr={"auto"} mb={"35px"}>
            <Heading>Billetera</Heading>
            <GuideWalletButton />
          </HStack>
          <PaginatedTable
            meta={meta}
            data={data}
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
