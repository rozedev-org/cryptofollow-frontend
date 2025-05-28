"use client";
import { Text, Flex, Icon, Box } from "@chakra-ui/react";
import { CurrencyCardProps } from "./currencyList";
import { NumericFormat } from "react-number-format";
import { FaBitcoin } from "react-icons/fa";

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
    >
      <Box
        p={2}
        borderRadius="full"
        bg="#d6b9c2"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mr={4}
      >
        <Icon boxSize={6}>
          <FaBitcoin />
        </Icon>
      </Box>
      <Flex flexDirection="column" flex="1">
        <Text fontWeight="bold" fontSize="lg" color="#d6b9c2">
          {symbol.toUpperCase()}
        </Text>
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
      </Flex>
    </Flex>
  );
};
