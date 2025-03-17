import { Flex } from "@chakra-ui/react";
import { NavBarUserOptions } from "./user-options";

export const Navbar = () => {
  return (
    <Flex
      bg={"#ffffff"}
      data-component={"navbar"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      pl={2}
      pr={2}
      borderColor={"#e2e8f0"}
      borderBottomWidth={"1px"}
      h={"4rem"}
      w={"100%"}
      gap={4}
    >
      {/* <NavbarTitle /> */}
      {/* <SearchButton /> */}
      {/* <NotificationButton /> */}
      {/* <ColorModeButton /> */}
      <NavBarUserOptions />
    </Flex>
  );
};
