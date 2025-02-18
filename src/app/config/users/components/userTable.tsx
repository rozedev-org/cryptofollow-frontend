"use client";
import { PaginatedTable } from "@/components/Table/PaginatedTable/PaginatedTable";
import { VStack, HStack, Heading } from "@chakra-ui/react";
import { UserColumns } from "../types/users.types";
import { UserDialogForm } from "./user-form";
import { useUsers } from "../hook/useUsers";
import { useEffect, useState } from "react";
import { PaginationParams } from "@/common/interfaces/response.interface";
import { LoadItem } from "@/components/layout/loading";
import { useHandleData } from "@/app/states/useHandleData";

export const UserTable = () => {
  const { refreshSignal, handleRefreshSignal } = useHandleData();
  const { fetchUsers, users } = useUsers();
  const [perPage, setPerPage] = useState(10);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const fetchData = async (page: number) => {
    setIsLoadingData(true);

    const queryPamas: PaginationParams = {
      page,
      take: perPage,
    };

    await fetchUsers(queryPamas);
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
    await fetchUsers(queryPamas);

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
            <Heading>Usuarios</Heading>
            <UserDialogForm />
          </HStack>
          <PaginatedTable
            meta={users.meta}
            data={users.data}
            handlePageChange={handlePageChange}
            handlePerRowsChange={handlePerRowsChange}
            columns={UserColumns}
            isLoadingData={isLoadingData}
          />
        </VStack>
      )}
    </>
  );
};
