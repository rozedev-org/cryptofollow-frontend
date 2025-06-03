/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useHandleData } from "@/app/states/useHandleData";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { PaginatedTable } from "@/components/Table/PaginatedTable/PaginatedTable";
import { LoadItem } from "@/components/layout/loading";
import { Box, Heading, HStack, Input, Tabs, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInvestments } from "../hook/useInvestment";
import { InvestmentsColumns } from "../types/investment.types";
import { InvestmentDialogForm } from "./dialog-form";
import { GuideInvestmentButton } from "./investment-guide-button";
import { PortfolioSummary } from "./portfolio-summary";
import { InputGroup } from "@/components/ui/input-group";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useResponsiveInfo } from "@/common/hook/useResponsiveInfo";
import { MobileCard } from "@/components/dashboard/MobileCard";

export const Investments = () => {
  const { refreshSignal, handleRefreshSignal } = useHandleData();
  const { isMobile } = useResponsiveInfo();
  const { fetchInvestments, invest } = useInvestments();
  const { data, meta } = invest;
  const [perPage, setPerPage] = useState(10);
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
        <VStack w={"100%"} id="base" maxW={"1400px"} m={"auto"}>
          <HStack mr={"auto"} mb={"35px"} w={"100%"}>
            <Heading fontWeight={700} fontSize={"1.5rem"} lineHeight={"2rem"}>
              Sus inversiones
            </Heading>
            <GuideInvestmentButton />
            <InvestmentDialogForm />
          </HStack>

          <PortfolioSummary />

          <VStack
            w={"100%"}
            bg={"#ffffff"}
            boxShadow={"0px 4px 32px 0px rgba(0, 0, 0, 0.07)"}
            p={"1rem"}
            borderRadius={"xl"}
            gap={"16px"}
          >
            <HStack w={"100%"} wrap={"wrap"}>
              <Box>
                <Tabs.Root
                  size={"sm"}
                  variant="enclosed"
                  defaultValue={"tab-1"}
                >
                  <Tabs.List
                    bg={"#f1f5f9"}
                    rounded="l3"
                    p="4px"
                    borderRadius={".75rem"}
                  >
                    <Tabs.Trigger
                      fontSize={"0.875rem"}
                      lineHeight={"1.25rem"}
                      fontWeight={500}
                      py={"0.375rem"}
                      px={"0.75rem"}
                      value="tab-1"
                    >
                      Todo
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      fontSize={"0.875rem"}
                      lineHeight={"1.25rem"}
                      fontWeight={500}
                      py={"0.375rem"}
                      px={"0.75rem"}
                      value="tab-2"
                    >
                      Ganancias
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      fontSize={"0.875rem"}
                      lineHeight={"1.25rem"}
                      fontWeight={500}
                      py={"0.375rem"}
                      px={"0.75rem"}
                      value="tab-3"
                    >
                      Perdida
                    </Tabs.Trigger>
                    <Tabs.Indicator rounded="l2" />
                  </Tabs.List>
                </Tabs.Root>
              </Box>

              <Box ml={"auto"} w={isMobile ? "100%" : "auto"}>
                <InputGroup
                  h={"36px"}
                  py={"0.5rem"}
                  flex="1"
                  startElementProps={{ padding: "11px 15px 11px 11px" }}
                  startElement={<HiMagnifyingGlass size={18} />}
                  display={["none", "flex"]}
                >
                  <Input
                    bg={"#f1f5f9"}
                    ml={"auto"}
                    borderRadius={"xl"}
                    border={"none"}
                    placeholder="Buscar..."
                    _placeholder={{
                      color: "#C9C9C9",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  />
                </InputGroup>
              </Box>
            </HStack>
            {isMobile ? (
              <Box overflowY={"scroll"} height={"50vh"} w={"300px"}>
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
                columns={InvestmentsColumns}
                isLoadingData={isLoadingData}
              />
            )}
          </VStack>
        </VStack>
      )}
    </>
  );
};
