"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { system } from "@/theme";
import { UserSessionProvider } from "@/app/session.provider";

export function Provider(props: Readonly<ColorModeProviderProps>) {
  return (
    <ChakraProvider value={system}>
      <UserSessionProvider>
        <ColorModeProvider {...props} />
      </UserSessionProvider>
    </ChakraProvider>
  );
}
