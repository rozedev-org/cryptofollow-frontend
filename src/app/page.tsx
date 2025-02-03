import { Assets } from "@/components/dashboard/assets";
import { Balance } from "@/components/dashboard/balance";
import { BasePage } from "@/components/layout/base-page/base-page";
export default function Dashboard() {
  return (
    <BasePage
      alignSelf={"flex-start"}
      gap={17}
      flexDir={"column"}
      p={4}
      h={"80h"}
    >
      <Balance />
      <Assets />
    </BasePage>
  );
}
