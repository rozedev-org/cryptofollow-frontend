import { Assets } from "@/components/dashboard/assets";
import { Balance } from "@/components/dashboard/balance";
import { VStack } from "@chakra-ui/react";
export default function Dashboard() {
  return (
    <VStack alignSelf={"flex-start"} gap={17}>
      <Balance />
      <Assets />
    </VStack>
  );
}
