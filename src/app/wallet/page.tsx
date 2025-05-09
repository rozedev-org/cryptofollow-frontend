import { BasePage } from "@/components/layout/base-page/base-page";
import { WalletTable } from "./components/WalletTable";

export const revalidate = 0;

export default function WalletPage() {
  return (
    <BasePage>
      <WalletTable />
    </BasePage>
  );
}
