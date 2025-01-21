/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useHandleCreateData } from "@/app/states/useHandleData";
import { useCurrencies } from "../hook/useCurrencies";
import { useEffect } from "react";
import { LoadItem } from "@/components/layout/loading";
import { Heading, HStack, Stack, Table, Text } from "@chakra-ui/react";
import { CurrencyMenu } from "./currencyMenu";
import { BiDotsHorizontal } from "react-icons/bi";
import { CurrencyDialogForm } from "./currency-form";
import { NumericFormat } from "react-number-format";

export const CurrencyTable = () => {
  const { handleRefreshSignal, refreshSignal } = useHandleCreateData();
  const { currency, fetchCurrencies, isLoading } = useCurrencies();

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (refreshSignal) {
      fetchCurrencies();
      handleRefreshSignal(false);
    }
  }, [refreshSignal]);

  return (
    <>
      {isLoading && <LoadItem />}
      {!isLoading && (
        <>
          <HStack mr={"auto"} mb={"35px"}>
            <Heading>Monedas</Heading>
            <CurrencyDialogForm />
          </HStack>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader w={"90px"}></Table.ColumnHeader>
                <Table.ColumnHeader w={"90px"}>Nombre</Table.ColumnHeader>
                <Table.ColumnHeader w={"90px"}>Moneda</Table.ColumnHeader>
                <Table.ColumnHeader w={"90px"}>Precio</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {currency.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Stack>
                      <CurrencyMenu
                        currency={item}
                        iconButton={<BiDotsHorizontal color="black" />}
                      />
                    </Stack>
                  </Table.Cell>
                  <Table.Cell>
                    <Stack mr={"56px"} mt={"30px"} mb={"30px"}>
                      <Text fontWeight="bold">{item.name}</Text>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{item.pair}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    {item.price <= 1 ? (
                      <NumericFormat
                        displayType="text"
                        value={item.price}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={8}
                        fixedDecimalScale
                        suffix={` $`}
                      />
                    ) : (
                      <NumericFormat
                        displayType="text"
                        value={item.price}
                        thousandSeparator="."
                        decimalSeparator=","
                        fixedDecimalScale
                        suffix={` $`}
                      />
                    )}
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
