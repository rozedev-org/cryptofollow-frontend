import { createColumnHelper } from "@tanstack/react-table";
import { UsersMenu } from "../components/userMenu";
import { BiDotsHorizontal } from "react-icons/bi";
import { Stack, Text } from "@chakra-ui/react";

export interface UserEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  loginTries: number;
  isEnabled: boolean;
  picture: string;
  role: string;
}
export interface newUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

const columnHelper = createColumnHelper<UserEntity>();

export const UserColumns = [
  columnHelper.accessor("id", {
    cell: (item) => (
      <UsersMenu
        user={item.row.original}
        iconButton={<BiDotsHorizontal color="black" />}
      />
    ),
    header: "",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <Stack mt={"25px"} mb={"6px"}>
        <Text fontWeight="bold">{row.original.email}</Text>
      </Stack>
    ),
    header: "Email",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => <Text>{row.original.firstName}</Text>,
    header: "Nombre",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => <Text>{row.original.lastName}</Text>,
    header: "Apellido",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => <Text>{row.original.role}</Text>,
    header: "Rol",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) =>
      row.original.isEnabled ? (
        <Text>Habilitado</Text>
      ) : (
        <Text>Deshabilitado</Text>
      ),
    header: "Esta Deshabilitado?",
  }),
];
