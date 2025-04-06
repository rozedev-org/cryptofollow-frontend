"use client";
import { Text, Box, Flex, Icon } from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";
import { CurrencyCardProps } from "./currencyList";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";

export const CurrencyListCard = (props: CurrencyCardProps) => {
  const { symbol, name, price, variation } = props;
  return (
    <Flex
      mt={2}
      borderWidth="1px"
      borderRadius="xl"
      p={3}
      align="center"
      justify="space-between"
      boxShadow="md"
      bg="white"
      w="100%"
    >
      <Flex align="center" gap={3}>
        <Icon size={"lg"}>
          <FaBitcoin />
        </Icon>
        <Box>
          <Text fontWeight="bold">{`${symbol}`}</Text>
          <Text fontSize="sm" color="gray.500">
            {`${name}`}
          </Text>
        </Box>
      </Flex>
      <Box textAlign="right">
        <Text fontWeight="bold">${price}</Text>
        <Flex
          align="center"
          justify="flex-end"
          color={variation > 0 ? "green.400" : "red.400"}
        >
          {variation > 0 ? (
            <Icon as={HiArrowNarrowUp} boxSize={4} mr={1} />
          ) : (
            <Icon as={HiArrowNarrowDown} boxSize={4} mr={1} />
          )}
          <Text fontSize="sm" ml={1}>
            {variation}%
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
