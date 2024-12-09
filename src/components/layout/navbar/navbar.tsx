import { HStack } from "@chakra-ui/react";
import { NavbarTitle } from "./navbar-title";
import { SearchButton } from "./search-button";
import { NotificationButton } from "./notification-button";
import { NavbarAvatar } from "./avatar";
import { ColorModeButton } from "@/components/ui/color-mode";

export const Navbar = () => {
  return (
    <HStack
      py={"27px"}
      px={"29px"}
      h={"90px"}
      style={{ width: "Calc(100vw - 256px)" }}
      mb={"33px"}
    >
      <NavbarTitle />
      <SearchButton />
      <NotificationButton />
      <NavbarAvatar />
      <ColorModeButton />
    </HStack>
  );
};
