"use client";
import { appRoutes } from "@/appRoutes";
import { StatLabel, StatRoot, StatValueText } from "@/components/ui/stat";
import { config } from "@/config";
import { Card, FormatNumber, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface WalletResponse {
  balance: number;
}

export const Balance = () => {
  const router = useRouter();
  const { bff } = config;
  const [wallet, setWallet] = useState<{ balance: number }>({
    balance: 0,
  });

  useEffect(() => {
    async function load() {
      const res = await fetch(`${bff.url}/wallet`, {
        credentials: "include",
      });

      if (res.status === 401) {
        router.push(appRoutes.home.login.url());
      }

      const walletResponse: WalletResponse = await res.json();
      setWallet((state) => ({ ...state, balance: walletResponse.balance }));
    }
    load();
  }, []);

  return (
    <Card.Root
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
            {/* <StatUpTrend
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
            </StatUpTrend> */}
          </HStack>
        </StatRoot>
      </Card.Body>
    </Card.Root>
  );
};
