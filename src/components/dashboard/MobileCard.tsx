import { Box, Flex, Text } from "@chakra-ui/react";
import { WalletIdentity } from "@/app/wallet/types/wallet.types";
import { NumericFormat } from "react-number-format";

interface MobileCardProps {
  walletIdentity: WalletIdentity;
}

export const MobileCard: React.FC<MobileCardProps> = ({ walletIdentity }) => {
  return (
    <Box
      mb={2}
      p={6}
      w="100%"
      borderRadius="2xl"
      border="1px solid"
      borderColor={"gray.50"}
      position="relative"
      overflow="hidden"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="bold" color={"black"}>
          {walletIdentity.currency.name}
        </Text>

        <Box borderRadius="md" px={3} py={1}>
          <Text
            fontSize="md"
            fontWeight="bold"
            color={
              walletIdentity.percentageVariation > 0 ? "#10b981" : "#ef4444"
            }
          >
            <NumericFormat
              thousandSeparator
              suffix="%"
              prefix=""
              displayType="text"
              value={walletIdentity.percentageVariation}
              decimalScale={2}
            />
          </Text>
        </Box>
      </Flex>

      <Box mb={6}>
        <Text fontSize="sm" mb={1}>
          Precio
        </Text>
        {walletIdentity.currency.price > 1 ? (
          <NumericFormat
            value={walletIdentity.currency.price}
            thousandSeparator
            decimalScale={2}
            prefix="$"
            displayType="text"
            renderText={(value) => (
              <Text fontSize="2xl" fontWeight="bold" color={"black"}>
                {value}
              </Text>
            )}
          />
        ) : (
          <NumericFormat
            value={walletIdentity.currency.price}
            thousandSeparator
            decimalScale={8}
            prefix="$"
            displayType="text"
            renderText={(value) => (
              <Text fontSize="2xl" fontWeight="bold" color={"black"}>
                {value}
              </Text>
            )}
          />
        )}
      </Box>

      <Flex justify="space-between">
        <Box>
          <Text fontSize="sm" mb={1}>
            Inversión
          </Text>
          <Text fontSize="lg" fontWeight="semibold" color={"black"}>
            <NumericFormat
              thousandSeparator
              prefix="$"
              displayType="text"
              value={walletIdentity.pairInvestment}
              decimalScale={2}
            />
          </Text>
        </Box>

        <Box textAlign="right">
          <Text fontSize="sm" mb={1}>
            Importe
          </Text>
          <Text fontSize="lg" fontWeight="semibold" color={"black"}>
            <NumericFormat
              thousandSeparator
              prefix="$"
              displayType="text"
              value={walletIdentity.pairAmount}
              decimalScale={2}
            />
          </Text>
        </Box>
      </Flex>

      <Box mt={6} pt={4} borderTop="1px solid" borderColor={"gray.50"}>
        <Text fontSize="sm" mb={1}>
          Ganancia/Pérdida
        </Text>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={walletIdentity.pairVariation >= 0 ? "#10b981" : "#ef4444"}
        >
          <NumericFormat
            thousandSeparator
            prefix="$"
            displayType="text"
            value={walletIdentity.pairVariation}
            decimalScale={2}
          />
        </Text>
      </Box>
    </Box>
  );
};
