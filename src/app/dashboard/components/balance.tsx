import {
  StatLabel,
  StatRoot,
  StatUpTrend,
  StatValueText,
} from "@/components/ui/stat";
import { Card, FormatNumber, HStack } from "@chakra-ui/react";

interface WalletResponse {
  balance: number;
}

export const Balance = async () => {
  const res = await fetch(
    "http://localhost:8000/api/cryptofollow-service/v1/wallet"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch wallet data");
  }

  const wallet: WalletResponse = await res.json();

  console.log("wallet :>> ", wallet);
  return (
    <Card.Root
      borderWidth={0}
      w={"842px"}
      height={"169px"}
      pt={"30px"}
      pl={"30px"}
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
        <StatRoot>
          <StatLabel
            color={"#969696"}
            fontSize={"14px"}
            fontWeight={400}
            letterSpacing={"0.28px"}
          >
            Balance Total
          </StatLabel>
          <HStack gap={"34px"}>
            <StatValueText
              fontSize={"21px"}
              fontWeight={"500"}
              color={"#1A1B2F"}
            >
              <FormatNumber
                value={wallet.balance}
                style="currency"
                currency="USD"
              />
            </StatValueText>
            <StatUpTrend
              py={"3px"}
              px={"10px"}
              bg={"#EBFFE8"}
              borderRadius={"6px"}
              variant="plain"
              color={"#1FCB4F"}
              fontSize={"12px"}
              fontWeight={500}
              lineHeight={"22.452px"}
            >
              0.25%
            </StatUpTrend>
          </HStack>
        </StatRoot>
      </Card.Body>
    </Card.Root>
  );
};
