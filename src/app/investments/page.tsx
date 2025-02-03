import { BasePage } from "@/components/layout/base-page/base-page";
import { InvestmentTable } from "./components/InvestmentTable";

export default function InvestmentsPage() {
  return (
    <BasePage>
      <InvestmentTable />
    </BasePage>
  );
}
