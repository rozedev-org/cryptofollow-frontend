import { Flex } from "@chakra-ui/react";
import { NavBarUserOptions } from "./user-options";
import { useResponsiveInfo } from "@/common/hook/useResponsiveInfo";
import { CurrencyListMobileDialog } from "@/components/dashboard/CurrencyListMobileDialog";

export const Navbar = () => {
  const { isMobile, isTablet } = useResponsiveInfo();
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
      {isMobile || isTablet ? <CurrencyListMobileDialog /> : null}
      <NavBarUserOptions />
    </Flex>
  );
};
