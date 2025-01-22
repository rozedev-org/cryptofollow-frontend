/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useWallet } from "../hook/useWallet";
import { For, Stack, Table, Text } from "@chakra-ui/react";
import { LoadItem } from "@/components/layout/loading";
import { NumericFormat } from "react-number-format";

export const WalletTable = () => {
  const { fetchWallet, wallet, isLoading } = useWallet();
  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <>
      {isLoading && <LoadItem />}
      {!isLoading && (
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
              )}
            </For>
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};
