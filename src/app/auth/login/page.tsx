import { HStack, Image, VStack, Heading } from "@chakra-ui/react";
import { LoginForm } from "./components/login-form";
export default function LoginPage() {
  return (
    <HStack h={"100vh"}>
      <Image src="/login-wallpaper.png" alt="213" minW="984px" h={"100%"} />
      <VStack display={"flex"} minW={"456px"} minH={"1024px"} p={"48px"}>
        <HStack mr={"auto"}>
          <Image src={"/logo.png"} alt="App Logo" width={"38"} height={"37"} />
          <Heading
            color={"#1A1B2F"}
            fontSize={"21px"}
            fontWeight={"700"}
            lineHeight={"normal"}
          >
            CryptoFollow
          </Heading>
        </HStack>
        <LoginForm />
      </VStack>
    </HStack>
  );
}
