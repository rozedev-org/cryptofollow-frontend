import { CurrencyTable } from "./components/currencyTable";
import { BasePage } from "@/components/layout/base-page/base-page";

export default function CurrenciesPage() {
  return (
    <BasePage flexDir={"column"}>
      <CurrencyTable />
    </BasePage>
  );
}
