import { Box } from "@chakra-ui/react";
import { CurrencyTable } from "./components/currencyTable";

export default function CurrenciesPage() {
  return (
    <Box overflowX="auto" w={"40vw"}>
      <CurrencyTable />
    </Box>
  );
}
