"use client";
import { InvestmentDialogForm } from "@/app/investments/components/dialog-form";
import { useBalance } from "@/app/wallet/hook/useWallet";
import { Badge, Card, FormatNumber, HStack, Stat } from "@chakra-ui/react";
import { useEffect } from "react";
import { HiArrowDown, HiArrowNarrowUp } from "react-icons/hi";
import { NumericFormat } from "react-number-format";

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
            {data.percentageVariation > 0 ? (
              <Badge colorPalette="green" borderRadius={"6px"} p={2}>
                <HiArrowNarrowUp />
                <NumericFormat
                  thousandSeparator
                  suffix="%"
                  prefix="$"
                  displayType="text"
                  value={data.percentageVariation}
                  decimalScale={2}
                />
              </Badge>
            ) : (
              <Badge colorPalette="red" borderRadius={"6px"} p={2}>
                <HiArrowDown />
                <FormatNumber value={data.percentageVariation} />%
              </Badge>
            )}
            <InvestmentDialogForm />
          </HStack>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
