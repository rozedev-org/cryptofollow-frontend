"use client";
import { useWallet } from "@/app/wallet/hook/useWallet";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { Box, Card, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PaginatedTable } from "../Table/PaginatedTable/PaginatedTable";
import { WalletColumns } from "@/app/wallet/types/wallet.types";
import { LoadItem } from "../layout/loading";
import { InvestmentDialogForm } from "@/app/investments/components/dialog-form";
import { useHandleData } from "@/app/states/useHandleData";
import { MobileCard } from "./MobileCard";
import { useResponsiveInfo } from "@/common/hook/useResponsiveInfo";

export const Assets = () => {
  const { refreshSignal, handleRefreshSignal } = useHandleData();
  const { fetchWallet, data, meta } = useWallet();
  const { isMobile } = useResponsiveInfo();
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
        <>
          <Card.Root
            borderWidth={0}
            w={"100%"}
            p={"30px"}
            borderRadius={"16px"}
            boxShadow={"0px 4px 32px 0px rgba(0, 0, 0, 0.07)"}
          >
            <HStack p={2}>
              <Card.Header
                color={"#1A1B2F"}
                fontSize={"18px"}
                fontWeight={500}
                pb={"23px"}
              >
                Activos
              </Card.Header>
              <InvestmentDialogForm />
            </HStack>

            <Card.Body>
              {isMobile ? (
                <Box overflowY={"scroll"} height={"50vh"}>
                  {data?.map((walletIdentity, index) => (
                    <MobileCard key={index} walletIdentity={walletIdentity} />
                  ))}
                </Box>
              ) : (
                <PaginatedTable
                  meta={meta}
                  data={data}
                  handlePageChange={handlePageChange}
                  handlePerRowsChange={handlePerRowsChange}
                  columns={WalletColumns}
                  isLoadingData={isLoadingData}
                />
              )}
            </Card.Body>
          </Card.Root>
        </>
      )}
    </>
  );
};
