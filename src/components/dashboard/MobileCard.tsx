import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useResponsiveInfo } from "@/common/hook/useResponsiveInfo";
import { WalletIdentity } from "@/app/wallet/types/wallet.types";

interface MobileCardProps {
  walletIdentity: WalletIdentity;
}

export const MobileCard: React.FC<MobileCardProps> = ({ walletIdentity }) => {
  const { isMobile } = useResponsiveInfo();

  if (!isMobile) return null;

  return (
    <Box
      overflowY={"scroll"}
      borderWidth={0}
      w={"100%"}
      p={"20px"}
      borderRadius={"16px"}
      boxShadow={"0px 4px 32px 0px rgba(0, 0, 0, 0.07)"}
    >
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="bold" color="#1A1B2F">
          {walletIdentity.currency.name}
        </Text>
      </Box>
      <Box mb={4}>
        <Text fontSize="md" color="red.500">
          {walletIdentity.percentageVariation}
        </Text>
      </Box>
      <Box mb={4}>
        <Text fontSize="sm" color="gray.500">
          Precio: {walletIdentity.currency.price}
        </Text>
      </Box>
      <Box mb={4}>
        <Text fontSize="sm" color="gray.500">
          Inversión: {walletIdentity.pairInvestment}
        </Text>
      </Box>
      <Box>
        <Text fontSize="sm" color="gray.500">
          Importe: {walletIdentity.pairAmount}
        </Text>
      </Box>
    </Box>
  );
};
