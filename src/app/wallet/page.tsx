import { Box } from "@chakra-ui/react";
import { WalletTable } from "./components/WalletTable";

export default function WalletPage() {
  return (
    <Box overflowX="auto">
      <WalletTable />
    </Box>
  );
}
