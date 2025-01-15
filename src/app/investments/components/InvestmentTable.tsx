/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Heading, HStack, Stack, Table, Text } from "@chakra-ui/react";
import { useInvestments } from "../hook/useInvestment";
import { BiDotsHorizontal } from "react-icons/bi";
import { InvestmentMenu } from "./InvestmentMenu";
import { InvestmentDialogForm } from "./dialog-form";
import { useEffect } from "react";
import { LoadItem } from "@/components/layout/loading";
import { useHandleData } from "@/app/states/useHandleData";
import { NumericFormat } from "react-number-format";

export const InvestmentTable = () => {
  const { refreshSignal, handleRefreshSignal } = useHandleData();
  const { fetchInvestments, invest, isLoading } = useInvestments();

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
      {isLoading && <LoadItem />}
      {!isLoading && (
        <>
          <HStack mr={"auto"} mb={"35px"}>
            <Heading>Inversiones</Heading>
            <InvestmentDialogForm />
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
                        invest={item}
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
                      <Stack mr={"30px"}>
                        <NumericFormat
                          displayType="text"
                          value={item.percentageVariation}
                          thousandSeparator="."
                          decimalSeparator=","
                          decimalScale={2}
                          fixedDecimalScale
                          prefix="+"
                          suffix={` %`}
                        />
                      </Stack>
                    </Table.Cell>
                  ) : (
                    <Table.Cell color="red.500">
                      <Stack mr={"30px"}>
                        <NumericFormat
                          displayType="text"
                          value={item.percentageVariation}
                          thousandSeparator="."
                          decimalSeparator=","
                          decimalScale={2}
                          fixedDecimalScale
                          suffix={` %`}
                        />
                      </Stack>
                    </Table.Cell>
                  )}
                  <Table.Cell>
                    <Stack mr={"41px"}>
                      <NumericFormat
                        displayType="text"
                        value={item.pairVariation}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={3}
                        fixedDecimalScale
                        suffix={` USDT`}
                      />
                      <NumericFormat
                        displayType="text"
                        value={item.pairVariation}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={3}
                        fixedDecimalScale
                        suffix={` ${item.currency.name}`}
                      />
                    </Stack>
                  </Table.Cell>
                  <Table.Cell>
                    <Stack mr={"72px"}>
                      <NumericFormat
                        displayType="text"
                        value={item.pairInvestment}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={3}
                        fixedDecimalScale
                        suffix={` USDT`}
                      />
                      <NumericFormat
                        displayType="text"
                        value={item.currencyInvestment}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={3}
                        fixedDecimalScale
                        suffix={` ${item.currency.name}`}
                      />
                    </Stack>
                  </Table.Cell>
                  <Table.Cell>
                    <Stack>
                      <NumericFormat
                        displayType="text"
                        value={item.pairAmount}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={3}
                        fixedDecimalScale
                        suffix={` USDT`}
                      />
                      <NumericFormat
                        displayType="text"
                        value={item.pairAmount}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={3}
                        fixedDecimalScale
                        suffix={` ${item.currency.name}`}
                      />
                    </Stack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      )}
    </>
  );
};
