import { CurrencyIdentity } from "@/app/currency/types/currency.types";
import { Text, Stack } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { NumericFormat } from "react-number-format";

export interface WalletIdentity {
  currency: CurrencyIdentity;
  currencyId: number;
  currencyInvestment: number;
  pairAmount: number;
  pairInvestment: number;
  pairVariation: number;
  percentageVariation: number;
}
export interface BalanceIdentity {
  balance: number;
  percentageVariation: number;
}

const columnHelper = createColumnHelper<WalletIdentity>();

export const WalletColumns = [
  columnHelper.accessor("currencyId", {
    cell: ({ row }) => (
      <Stack mt={"25px"} mb={"6px"} id="name">
        <Text fontWeight="bold">{row.original.currency.name}</Text>
        <Text fontSize="sm" color="gray.500">
          {row.original.currency.name} / USDT
        </Text>
      </Stack>
    ),
    header: "Moneda",
  }),

  columnHelper.accessor("currencyId", {
    cell: ({ row }) => (
      <Text id="price">{row.original.currency.price} USDT</Text>
    ),
    header: "Precio",
  }),

  columnHelper.accessor("currencyId", {
    cell: ({ row }) => (
      <Stack
        id="variaton"
        color={row.original.percentageVariation > 0 ? "green.500" : "red.500"}
      >
        <NumericFormat
          displayType="text"
          value={row.original.percentageVariation}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={2}
          fixedDecimalScale
          suffix={` %`}
        />
      </Stack>
    ),
    header: "Variacion %",
  }),

  columnHelper.accessor("currencyId", {
    cell: ({ row }) => (
      <Stack id="gain">
        <NumericFormat
          displayType="text"
          value={row.original.pairVariation}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={3}
          fixedDecimalScale
          suffix={` USDT`}
        />
        <NumericFormat
          displayType="text"
          value={row.original.pairVariation}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={3}
          fixedDecimalScale
          suffix={` ${row.original.currency.name}`}
        />
      </Stack>
    ),
    header: "+/-",
  }),

  columnHelper.accessor("currencyId", {
    cell: ({ row }) => (
      <Stack id="invest">
        <NumericFormat
          displayType="text"
          value={row.original.pairInvestment}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={3}
          fixedDecimalScale
          suffix={` USDT`}
        />
        <NumericFormat
          displayType="text"
          value={row.original.currencyInvestment}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={3}
          fixedDecimalScale
          suffix={` ${row.original.currency.name}`}
        />
      </Stack>
    ),
    header: "Inversión",
  }),

  columnHelper.accessor("currencyId", {
    cell: ({ row }) => (
      <Stack id="import">
        <NumericFormat
          displayType="text"
          value={row.original.pairAmount}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={3}
          fixedDecimalScale
          suffix={` USDT`}
        />
      </Stack>
    ),
    header: "Importe",
  }),
];
