"use client";
import { Card, Text } from "@chakra-ui/react";
import { CurrencyListCard } from "./currencyCard";
import { cryptoList } from "@/constants/currencyList.constant";
import { useResponsiveInfo } from "@/common/hook/useResponsiveInfo";

export interface CurrencyCardProps {
  symbol: string;
  name: string;
  price: string;
  variation: number;
}
export const CurrencyList = () => {
  const { isMobile, isTablet } = useResponsiveInfo();

  return (
    <Card.Root
      display={isMobile || isTablet ? "none" : "flex"}
      w={"400px"}
      borderWidth={0}
      height={"83vh"}
      p={3}
      borderRadius={"16px"}
      boxShadow={"0px 4px 32px 0px rgba(0, 0, 0, 0.07)"}
    >
      <Card.Header
        color={"#1A1B2F"}
        fontSize={"18px"}
        fontWeight={500}
        pb={"23px"}
      >
        <Text>Mercado</Text>
      </Card.Header>
      <Card.Body
        overflowY={"scroll"}
        alignItems={isMobile || isTablet ? "center" : "unset"}
      >
        {cryptoList.map((item, i) => {
          return (
            <CurrencyListCard
              key={`${item.symbol}-${i}	`}
              name={item.name}
              price={item.price}
              variation={item.variation}
              symbol={item.symbol}
            />
          );
        })}
      </Card.Body>
    </Card.Root>
  );
};
