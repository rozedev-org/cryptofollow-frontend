import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyMenu } from "../components/currencyMenu";
import { BiDotsHorizontal } from "react-icons/bi";
import { Text, Stack } from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

export interface CurrencyIdentity {
  id: number;
  name: string;
  pair: string;
  price: number;
}

export interface newCurrency {
  name: string;
  pair: string;
  price: number;
}

export interface BinanceCurrency {
  symbol: string;
  price: string;
}

const columnHelper = createColumnHelper<CurrencyIdentity>();

export const CurrencyColumns = [
  columnHelper.accessor("id", {
    cell: (item) => (
      <Stack w={"100%"}>
        <CurrencyMenu
          currency={item.row.original}
          iconButton={<BiDotsHorizontal color="black" />}
        />
      </Stack>
    ),
    header: "",
  }),
  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <Stack mr={"56px"} mt={"30px"} mb={"30px"} id="currency">
        <Text fontWeight="bold">{row.original.name}</Text>
      </Stack>
    ),
    header: "Nombre",
  }),
  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <Stack mr={"56px"} mt={"30px"} mb={"30px"} id="reference">
        <Text fontWeight="bold">{row.original.pair}</Text>
      </Stack>
    ),
    header: "Moneda",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <>
        {row.original.price <= 1 ? (
          <NumericFormat
            id="price"
            displayType="text"
            value={row.original.price}
            thousandSeparator=","
            decimalSeparator="."
            decimalScale={8}
            fixedDecimalScale
            suffix={` $`}
          />
        ) : (
          <NumericFormat
            id="price"
            displayType="text"
            value={row.original.price}
            thousandSeparator=","
            decimalSeparator="."
            fixedDecimalScale
            suffix={` $`}
          />
        )}
      </>
    ),
    header: "Precio",
  }),
];
