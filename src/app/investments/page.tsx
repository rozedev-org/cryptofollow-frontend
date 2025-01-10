import { Box } from "@chakra-ui/react";
import { InvestmentTable } from "./components/InvestmentTable";

export default function InvestmentsPage() {
  return (
    <Box overflowX="auto">
      <InvestmentTable />
    </Box>
  );
}
