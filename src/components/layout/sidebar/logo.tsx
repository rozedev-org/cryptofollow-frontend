import { Heading, HStack } from "@chakra-ui/react";
import Image from "next/image";

export const SideBarLogo = () => {
  return (
    <HStack
      w={"100%"}
      gap={"7px"}
      h={"4rem"}
      borderColor={"#e2e8f0"}
      borderBottomWidth={"1px"}
      padding={"0 16px"}
    >
      <Image src={"/logo.png"} alt="App Logo" width={"38"} height={"37"} />
      <Heading
        color={"#1A1B2F"}
        fontSize={"1.125rem"}
        fontWeight={"700"}
        lineHeight={"1.75rem"}
      >
        CRYPTO FOLLOW
      </Heading>
    </HStack>
  );
};
