import { ColorModeButton } from "@/components/ui/color-mode";
import { Flex } from "@chakra-ui/react";
import { NotificationButton } from "./notification-button";
import { SearchButton } from "./search-button";
import { NavBarUserOptions } from "./user-options";

export const Navbar = () => {
  return (
    <Flex
      data-component={"navbar"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      pl={2}
      pr={2}
      // py={"27px"}
      // px={"29px"}
      h={"90px"}
      // style={{ width: "Calc(100vw - 256px)" }}
      w={"100%"}
    >
      {/* <NavbarTitle /> */}
      <SearchButton />
      <NotificationButton />
      <NavBarUserOptions />
      <ColorModeButton />
    </Flex>
  );
};
