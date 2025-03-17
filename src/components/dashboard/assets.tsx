"use client";
import { useWallet } from "@/app/wallet/hook/useWallet";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PaginatedTable } from "../Table/PaginatedTable/PaginatedTable";
import { WalletColumns } from "@/app/wallet/types/wallet.types";
import { LoadItem } from "../layout/loading";

export const Assets = () => {
  const { fetchWallet, data, meta } = useWallet();
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

  return (
    <>
      {isLoadingPage && <LoadItem />}
      {!isLoadingPage && (
        <Card.Root
          borderWidth={0}
          w={"100%"}
          p={"30px"}
          borderRadius={"16px"}
          boxShadow={"0px 4px 32px 0px rgba(0, 0, 0, 0.07)"}
        >
          <Card.Header
            color={"#1A1B2F"}
            fontSize={"18px"}
            fontWeight={500}
            pb={"23px"}
          >
            Activos
          </Card.Header>
          <Card.Body>
            <PaginatedTable
              meta={meta}
              data={data}
              handlePageChange={handlePageChange}
              handlePerRowsChange={handlePerRowsChange}
              columns={WalletColumns}
              isLoadingData={isLoadingData}
            />
          </Card.Body>
        </Card.Root>
      )}
    </>
  );
};
