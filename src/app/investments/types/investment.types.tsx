import { createColumnHelper } from "@tanstack/react-table";
import { InvestmentMenu } from "../components/InvestmentMenu";
import { BiDotsHorizontal } from "react-icons/bi";
import { Stack, Text } from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

export interface InvestmentIdentity {
  id: number;
  buyPrice: number;
  currency: CurrencyIdentity;
  currencyId: number;
  currencyInvestment: number;
  pairAmount: number;
  pairInvestment: number;
  pairVariation: number;
  percentageVariation: number;
  userId: number;
}

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

export interface newInvestment {
  buyPrice: number;
  currencyInvestment: number;
  currencyId: number;
  userId: number;
}

const columnHelper = createColumnHelper<InvestmentIdentity>();

export const InvestmentsColumns = [
  columnHelper.accessor("id", {
    cell: (item) => (
      <InvestmentMenu
        invest={item.row.original}
        iconButton={<BiDotsHorizontal color="black" />}
      />
    ),
    header: "",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <Stack mr={"56px"} mt={"25px"} mb={"6px"}>
        <Text fontWeight="bold">{row.original.currency.name}</Text>
        <Text fontSize="sm" color="gray.500">
          {row.original.currency.name} / USDT
        </Text>
      </Stack>
    ),
    header: "Moneda",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <Text mr={"77px"}>{row.original.currency.price} USDT</Text>
    ),
    header: "Precio",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <Stack
        mr={"30px"}
        color={row.original.percentageVariation > 0 ? "green.500" : "red.500"}
      >
        <NumericFormat
          displayType="text"
          value={row.original.percentageVariation}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          prefix="+"
          suffix={` %`}
        />
      </Stack>
    ),
    header: "24h",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <Stack mr={"41px"}>
        <NumericFormat
          displayType="text"
          value={row.original.pairVariation}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={3}
          fixedDecimalScale
          suffix={` USDT`}
        />
        <NumericFormat
          displayType="text"
          value={row.original.pairVariation}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={3}
          fixedDecimalScale
          suffix={` ${row.original.currency.name}`}
        />
      </Stack>
    ),
    header: "+/-",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <Stack mr={"72px"}>
        <NumericFormat
          displayType="text"
          value={row.original.pairInvestment}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={3}
          fixedDecimalScale
          suffix={` USDT`}
        />
        <NumericFormat
          displayType="text"
          value={row.original.currencyInvestment}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={3}
          fixedDecimalScale
          suffix={` ${row.original.currency.name}`}
        />
      </Stack>
    ),
    header: "Inversión",
  }),

  columnHelper.accessor("id", {
    cell: ({ row }) => (
      <Stack>
        <NumericFormat
          displayType="text"
          value={row.original.pairAmount}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={3}
          fixedDecimalScale
          suffix={` USDT`}
        />
        <NumericFormat
          displayType="text"
          value={row.original.pairAmount}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={3}
          fixedDecimalScale
          suffix={` ${row.original.currency.name}`}
        />
      </Stack>
    ),
    header: "Importe",
  }),
];
