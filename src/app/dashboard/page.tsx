import { VStack } from "@chakra-ui/react";
import { Balance } from "./components/balance";
import { Assets } from "./components/assets";
export default function Dashboard() {
  return (
    <VStack alignSelf={"flex-start"} gap={17}>
      <Balance />
      <Assets />
    </VStack>
  );
}
