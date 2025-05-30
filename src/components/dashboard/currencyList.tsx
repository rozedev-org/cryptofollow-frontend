"use client";
import { Card, Input, Text, VStack } from "@chakra-ui/react";
import { CurrencyListCard } from "./currencyCard";
import { useResponsiveInfo } from "@/common/hook/useResponsiveInfo";
import { useBinanceCurrencies } from "@/app/currency/hook/useCurrencies";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export interface CurrencyCardProps {
  symbol: string;
  price: string;
}
export const CurrencyList = () => {
  const { isMobile, isTablet } = useResponsiveInfo();
  const { currency, fetchBinanceCurrencies } = useBinanceCurrencies();
  const [visibleCurrencies, setVisibleCurrencies] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    fetchBinanceCurrencies();
  }, []);

  useEffect(() => {
    if (searchText !== "") {
      setShowLoadMore(false);
    } else {
      setShowLoadMore(true);
    }
  }, [searchText]);

  const handleLoadMore = () => {
    setVisibleCurrencies((prev) => prev + 20);
  };

  const filteredCurrencies = currency.filter((item) =>
    item.symbol.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card.Root
      display={isMobile || isTablet ? "none" : "flex"}
      w={"340px"}
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
        pb={"2px"}
      >
        <Text textAlign={"start"}>Mercado</Text>
        <Input
          placeholder="Buscador"
          mb={2}
          p={2}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Card.Header>
      <Card.Body
        overflowX={"hidden"}
        overflowY={"scroll"}
        alignItems={isMobile || isTablet ? "center" : "unset"}
      >
        {filteredCurrencies.slice(0, visibleCurrencies).map((item, i) => {
          return (
            <CurrencyListCard
              key={`${item.symbol}-${i}	`}
              price={item.price}
              symbol={item.symbol}
            />
          );
        })}
        {showLoadMore
          ? visibleCurrencies < currency.length && (
              <VStack mt={4} mb={4}>
                <Button onClick={handleLoadMore} variant="outline">
                  Cargar más
                </Button>
              </VStack>
            )
          : null}
      </Card.Body>
    </Card.Root>
  );
};
