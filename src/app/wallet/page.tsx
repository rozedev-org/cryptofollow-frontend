import { Box, Table } from "@chakra-ui/react";
import { WalletTableBody } from "./components/WalletTableBody";

export default function WalletPage() {
  return (
    <Box overflowX="auto">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Moneda</Table.ColumnHeader>
            <Table.ColumnHeader>Precio</Table.ColumnHeader>
            <Table.ColumnHeader>24 h</Table.ColumnHeader>
            <Table.ColumnHeader>+/-</Table.ColumnHeader>
            <Table.ColumnHeader>Inversión</Table.ColumnHeader>
            <Table.ColumnHeader>Importe</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <WalletTableBody />
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
