/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useWallet } from "../hook/useWallet";
import { For, Stack, Table, Text } from "@chakra-ui/react";

export const WalletTableBody = () => {
  const { fetchWallet, wallet } = useWallet();
  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <>
      <For each={wallet}>
      {(item, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <Stack mr={"56px"} mt={"25px"} mb={"6px"}>
              <Text fontWeight="bold">{item.currency.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {item.currency.name} / USDT
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Text mr={"77px"}>{item.currency.price} USDT</Text>
          </Table.Cell>
          {item.percentageVariation > 0 ? (
            <Table.Cell color="green.500">
              <Text mr={"50px"}>+{item.percentageVariation.toFixed(2)}%</Text>
            </Table.Cell>
          ) : (
            <Table.Cell color="red.500">
              <Text mr={"50px"}> {item.percentageVariation.toFixed(2)}%</Text>
            </Table.Cell>
          )}
          <Table.Cell>
            <Stack mr={"41px"}>
              <Text>{item.pairVariation.toFixed(2)} USDT</Text>
              <Text fontSize="sm" color="gray.500">
                {item.pairVariation.toFixed(2)} {item.currency.name}
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
            <Stack mr={"72px"}>
              <Text>{item.pairInvestment} USDT</Text>
              <Text fontSize="sm" color="gray.500">
                {item.currencyInvestment} {item.currency.name}
              </Text>
            </Stack>
          </Table.Cell>
          <Table.Cell>
          <Text>{item.pairAmount.toFixed(2)} USDT</Text>
          <Text fontSize="sm" color="gray.500">
            {item.pairAmount.toFixed(2)} {item.currency.name}
          </Text>
          </Table.Cell>
        </Table.Row>
      )}
    </For>
    </>
  );
};
