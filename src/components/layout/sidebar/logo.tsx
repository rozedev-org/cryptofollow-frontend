import { Heading, HStack } from "@chakra-ui/react";
import Image from "next/image";

export const SideBarLogo = () => {
  return (
    <HStack gap={"7px"} h={"90px"}>
      <Image src={"/logo.png"} alt="App Logo" width={"38"} height={"37"} />
      <Heading
        color={"#1A1B2F"}
        fontSize={"14px"}
        fontWeight={"700"}
        lineHeight={"normal"}
      >
        CryptoFollow
      </Heading>
    </HStack>
  );
};
