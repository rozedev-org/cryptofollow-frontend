"use client";
import { useBalance } from "@/app/wallet/hook/useWallet";
import { Badge, Card, FormatNumber, HStack, Stat } from "@chakra-ui/react";
import { useEffect } from "react";
import { HiArrowDown, HiArrowNarrowUp } from "react-icons/hi";

export const Balance = () => {
  const { fetchBalance, data } = useBalance();
  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <Card.Root
      w={"100%"}
      borderWidth={0}
      height={"169px"}
      p={"30px"}
      borderRadius={"16px"}
      boxShadow={"0px 4px 32px 0px rgba(0, 0, 0, 0.07)"}
    >
      <Card.Header
        color={"#1A1B2F"}
        fontSize={"18px"}
        fontWeight={500}
        pb={"23px"}
      >
        Balance
      </Card.Header>
      <Card.Body>
        <Stat.Root>
          <Stat.Label>Balance Total</Stat.Label>
          <HStack>
            <Stat.ValueText>
              <FormatNumber
                value={data.balance}
                style="currency"
                currency="USD"
              />
            </Stat.ValueText>
            {100 > 0 ? (
              <Badge colorPalette="green" borderRadius={"6px"} p={2}>
                <HiArrowNarrowUp />+{100}%
              </Badge>
            ) : (
              <Badge colorPalette="red" borderRadius={"6px"} p={2}>
                <HiArrowDown />-{100}%
              </Badge>
            )}
            {/* {data.variation > 0 ? (
              <Badge colorPalette="green" borderRadius={"6px"} p={2}>
                <HiArrowNarrowUp />+{data.variation}%
              </Badge>
            ) : (
              <Badge colorPalette="red" borderRadius={"6px"} p={2}>
                <HiArrowDown />-{data.variation}%
              </Badge>
            )} */}
          </HStack>
          <Stat.HelpText>Actualizado hace : 20 minutos</Stat.HelpText>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
