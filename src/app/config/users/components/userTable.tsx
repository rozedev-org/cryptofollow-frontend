"use client";
import { PaginatedTable } from "@/components/Table/PaginatedTable/PaginatedTable";
import { user } from "@/constants/userPage.constant";
import { VStack, HStack, Heading } from "@chakra-ui/react";
import { UserColumns } from "../types/users.types";
import { UserDialogForm } from "./user-form";

export const UserTable = () => {
  const handlePerRowsChange = async () => {};
  return (
    <VStack w={"100%"}>
      <HStack mr={"auto"} mb={"35px"}>
        <Heading>Usuarios</Heading>
        <UserDialogForm />
      </HStack>
      <PaginatedTable
        meta={user.meta}
        data={user.data}
        handlePageChange={() => {}}
        handlePerRowsChange={handlePerRowsChange}
        columns={UserColumns}
        isLoadingData={false}
      />
    </VStack>
  );
};
