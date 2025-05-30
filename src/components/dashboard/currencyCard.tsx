"use client";
import { Text, Flex, Icon } from "@chakra-ui/react";
import { CurrencyCardProps } from "./currencyList";
import { NumericFormat } from "react-number-format";
import { FaBitcoin } from "react-icons/fa";
import { Tooltip } from "../ui/tooltip";

export const CurrencyListCard = (props: CurrencyCardProps) => {
  const { symbol, price } = props;

  return (
    <Flex
      mt={4}
      borderWidth="1px"
      borderRadius="xl"
      p={4}
      boxShadow="lg"
      bgGradient="linear(to-r, #d6b9c2, white)"
      alignItems="center"
      w="100%"
      maxW="230px"
    >
      <Icon
        size={"xl"}
        borderRadius="full"
        bg="#d6b9c2"
        color="white"
        display="flex"
        mr={4}
      >
        <FaBitcoin />
      </Icon>
      <Tooltip content={symbol} openDelay={10} closeDelay={50}>
        <Text fontWeight="bold" fontSize="lg" color="#d6b9c2" pr={2} truncate>
          {symbol.toUpperCase()}
        </Text>
      </Tooltip>
      {Number(price) > 1 ? (
        <NumericFormat
          value={price}
          thousandSeparator
          decimalScale={2}
          prefix="$"
          displayType="text"
          renderText={(value) => (
            <Text fontSize="md" color="gray.600">
              {value}
            </Text>
          )}
        />
      ) : (
        <NumericFormat
          value={price}
          thousandSeparator
          decimalScale={8}
          prefix="$"
          displayType="text"
          renderText={(value) => (
            <Text fontSize="md" color="gray.600">
              {value}
            </Text>
          )}
        />
      )}
    </Flex>
  );
};
