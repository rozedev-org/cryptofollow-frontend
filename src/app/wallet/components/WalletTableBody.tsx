"use client";
import { useEffect } from "react";
import { useWallet } from "../hook/useWallet";
import { For, Stack, Table, Text } from "@chakra-ui/react";
import { dataWallet } from "@/constants/walletPage.constant";

export const WalletTableBody = () => {
  const { fetchWallet } = useWallet();
  useEffect(() => {
    fetchWallet();
  }, []);

  return (
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
  );
};
