import { HStack, Image, VStack, Heading } from "@chakra-ui/react";
import { LoginForm } from "./components/login-form";
import { BasePage } from "@/components/layout/base-page/base-page";
export default function LoginPage() {
  return (
    <BasePage h={"100vh"} p={0} justifyContent={"center"}>
      <Image
        src="/login-wallpaper.png"
        alt="213"
        minW={[0, 0, 0, "600px", "984px"]}
        w={[0, 0, 0, "100%"]}
        h={"100%"}
      />
      <VStack display={"flex"} minW={"456px"} p={"48px"}>
        <HStack mr={"auto"}>
          <Image
            src={"/logo.png"}
            alt="App Logo"

            // width={"38"}
            //  height={"37"}
          />
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
    </BasePage>
  );
}
