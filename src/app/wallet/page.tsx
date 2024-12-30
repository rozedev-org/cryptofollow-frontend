/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Box, Table, Stack, Text, For } from "@chakra-ui/react";
import { useWallet } from "./hook/useWallet";
import { useEffect } from "react";

export default function WalletPage() {
  const dataWallet = [
    {
      currency: "DOGE",
      priceUSDT: 0.46032,
      gain24h: 22.5,
      gainUSDT: 22.5,
      gainCurrency: 10.08,
      investmentUSDT: 100,
      investmentCurrency: 44.14,
      totalUSDT: 122.5,
      totalCurrency: 54.22,
    },
    {
      currency: "USDT",
      priceUSDT: 0.0000228,
      gain24h: -10,
      gainUSDT: -14,
      gainCurrency: -14,
      investmentUSDT: 100,
      investmentCurrency: 100,
      amountCurrency: 200.964,
      totalUSDT: 114,
      totalCurrency: 114,
    },
    {
      currency: "ETH",
      priceUSDT: 0.0000228,
      gain24h: 2.6,
      gainUSDT: 2.6,
      gainCurrency: 2.6,
      investmentUSDT: 100,
      investmentCurrency: 100,
      amountCurrency: 2100511,
      totalUSDT: 114,
      totalCurrency: 114,
    },
    {
      currency: "BTC",
      priceUSDT: 0.0000228,
      gain24h: -2.6,
      gainUSDT: -2.6,
      gainCurrency: -2.6,
      investmentUSDT: 100,
      investmentCurrency: 100,
      amountCurrency: 2100511,
      totalUSDT: 114,
      totalCurrency: 114,
    },
  ];
  const {fetchWallet} = useWallet()
  useEffect(() => {
    fetchWallet()
  }, [])
  
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
          <For each={dataWallet}>
            {(item, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Stack mr={"56px"} mt={"25px"} mb={"6px"}>
                    <Text fontWeight="bold">{item.currency}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {item.currency} / USDT
                    </Text>
                  </Stack>
                </Table.Cell>
                <Table.Cell>
                  <Text mr={"77px"}>{item.priceUSDT} USDT</Text>
                </Table.Cell>
                {item.gain24h > 0 ? (
                  <Table.Cell color="green.500">
                    <Text mr={"50px"}>+{item.gain24h}%</Text>
                  </Table.Cell>
                ) : (
                  <Table.Cell color="red.500">
                    <Text mr={"50px"}>{item.gain24h}%</Text>
                  </Table.Cell>
                )}
                <Table.Cell>
                  <Stack mr={"41px"}>
                    <Text>{item.gainUSDT} USDT</Text>
                    <Text fontSize="sm" color="gray.500">
                      {item.gainCurrency} {item.currency}
                    </Text>
                  </Stack>
                </Table.Cell>
                <Table.Cell>
                  <Stack mr={"72px"}>
                    <Text>{item.investmentUSDT} USDT</Text>
                    <Text fontSize="sm" color="gray.500">
                      {item.investmentCurrency} DOGE
                    </Text>
                  </Stack>
                </Table.Cell>
                <Table.Cell>
                  <Text>{item.totalUSDT} USDT</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.totalCurrency} {item.currency}
                  </Text>
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
