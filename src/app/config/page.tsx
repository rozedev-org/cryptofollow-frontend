import React from "react";
import { ConfigButton } from "./components/config-button";
import { BasePage } from "@/components/layout/base-page/base-page";
import { VStack } from "@chakra-ui/react";
import { appRoutes } from "@/appRoutes";

export default function ConfigPage() {
  return (
    <BasePage>
      <VStack m={2}>
        <ConfigButton
          title={"Usuarios"}
          route={appRoutes.home.config.users.url()}
        />
        <ConfigButton title={"Titulo"} route={"/"} />
        <ConfigButton title={"Titulo"} route={"/"} />
      </VStack>
    </BasePage>
  );
}
