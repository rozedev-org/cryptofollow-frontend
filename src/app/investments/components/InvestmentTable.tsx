/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Heading, HStack, Stack, Table, Text } from "@chakra-ui/react";
import { useInvestments } from "../hook/useInvestment";
import { BiDotsHorizontal } from "react-icons/bi";
import { InvestmentMenu } from "./InvestmentMenu";
import { InvestmentDialogForm } from "./dialog-form";
import { useEffect } from "react";

export const InvestmentTable = () => {
  const {
    fetchInvestments,
    invest,
    refreshSignal,
    handleRefreshSignal,
    isLoading,
  } = useInvestments();

  useEffect(() => {
    fetchInvestments();
  }, []);

  useEffect(() => {
    if (refreshSignal) {
      fetchInvestments();
      handleRefreshSignal(false);
    }
  }, [refreshSignal]);
  return (
    <>
      {!isLoading ? (
        <>
          <HStack mr={"auto"} mb={"35px"}>
            <Heading>Inversiones</Heading>
            <InvestmentDialogForm handleRefreshSignal={handleRefreshSignal} />
          </HStack>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader></Table.ColumnHeader>
                <Table.ColumnHeader>Moneda</Table.ColumnHeader>
                <Table.ColumnHeader>Precio</Table.ColumnHeader>
                <Table.ColumnHeader>24 h</Table.ColumnHeader>
                <Table.ColumnHeader>+/-</Table.ColumnHeader>
                <Table.ColumnHeader>Inversión</Table.ColumnHeader>
                <Table.ColumnHeader>Importe</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {invest.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Stack>
                      <InvestmentMenu
                        investId={item.id}
                        iconButton={<BiDotsHorizontal color="black" />}
                      />
                    </Stack>
                  </Table.Cell>
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
                      <Text mr={"50px"}>
                        +{item.percentageVariation.toFixed(2)}%
                      </Text>
                    </Table.Cell>
                  ) : (
                    <Table.Cell color="red.500">
                      <Text mr={"50px"}>
                        {item.percentageVariation.toFixed(2)}%
                      </Text>
                    </Table.Cell>
                  )}
                  <Table.Cell>
                    <Stack mr={"41px"}>
                      <Text>{item.pairVariation.toFixed(2)} USDT</Text>
                      <Text fontSize="sm" color="gray.500">
                        {item.pairVariation.toFixed(2)} DOGE
                      </Text>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell>
                    <Stack mr={"72px"}>
                      <Text>{item.pairInvestment.toFixed(2)} USDT</Text>
                      <Text fontSize="sm" color="gray.500">
                        {item.currencyInvestment.toFixed(2)} DOGE
                      </Text>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{item.pairAmount.toFixed(2)} USDT</Text>
                    <Text fontSize="sm" color="gray.500">
                      {item.pairAmount.toFixed(2)} DOGE
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};
