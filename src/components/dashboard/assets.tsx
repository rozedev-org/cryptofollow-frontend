import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { StatRoot, StatUpTrend } from "@/components/ui/stat";
import { Card, For, FormatNumber, HStack, Table } from "@chakra-ui/react";

export const Assets = () => {
  return (
    <Card.Root
      borderWidth={0}
      w={"842px"}
      height={"376px"}
      pt={"30px"}
      pl={"30px"}
      pr={"32px"}
      pb={"9px"}
      borderRadius={"16px"}
      boxShadow={"0px 4px 32px 0px rgba(0, 0, 0, 0.07)"}
    >
      <Card.Header
        color={"#1A1B2F"}
        fontSize={"18px"}
        fontWeight={500}
        pb={"23px"}
      >
        Activos
      </Card.Header>
      <Card.Body display={"flex"} gap={"54px"}>
        <Table.Root w={"full"} size={"lg"} interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader></Table.ColumnHeader>
              <Table.ColumnHeader>Moneda</Table.ColumnHeader>
              <Table.ColumnHeader>Precio</Table.ColumnHeader>
              <Table.ColumnHeader>24h</Table.ColumnHeader>
              <Table.ColumnHeader>+/-</Table.ColumnHeader>
              <Table.ColumnHeader>Inversión</Table.ColumnHeader>
              <Table.ColumnHeader>Importe</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <For
              each={[
                {
                  currency: "BONK",
                  tradingPair: "USDT",
                  price: 0.0000228,
                  variation: 14,
                  percentageVariation: "24%",
                  pairInvestment: 100,
                  currencyInvestment: 4200964,
                  pairAmount: 114,
                  currencyAmount: 4385964,
                },
              ]}
            >
              {(item, index) => (
                <Table.Row key={`Asset-${index}`}>
                  <Table.Cell>-</Table.Cell>
                  {/* Currency */}
                  <Table.Cell>{item.currency}</Table.Cell>
                  {/* Price */}
                  <Table.Cell>
                    <FormatNumber
                      value={item.price}
                      style="currency"
                      currency={"USD"}
                      minimumFractionDigits={8}
                    />
                  </Table.Cell>

                  {/* Variation Percentage */}
                  <Table.Cell>
                    {
                      <StatRoot w={"80px"}>
                        <StatUpTrend
                          py={"3px"}
                          px={"10px"}
                          bg={"#EBFFE8"}
                          borderRadius={"6px"}
                          variant="plain"
                          color={"#1FCB4F"}
                          fontSize={"14px"}
                          fontWeight={500}
                          lineHeight={"22.452px"}
                        >
                          {item.percentageVariation}
                        </StatUpTrend>
                      </StatRoot>
                    }
                  </Table.Cell>
                  {/* Variation */}
                  <Table.Cell>
                    <FormatNumber
                      value={item.variation}
                      style="currency"
                      currency={"USD"}
                    />
                  </Table.Cell>
                  {/* Investment */}
                  <Table.Cell>
                    <FormatNumber
                      value={item.pairInvestment}
                      style="currency"
                      currency={"USD"}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <FormatNumber
                      value={item.pairAmount}
                      style="currency"
                      currency={"USD"}
                    />
                  </Table.Cell>
                </Table.Row>
              )}
            </For>
          </Table.Body>
        </Table.Root>

        <PaginationRoot
          count={30}
          pageSize={5}
          page={1}
          mt={"auto"}
          alignSelf={"center"}
        >
          <HStack wrap="wrap">
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Card.Body>
    </Card.Root>
  );
};
