import { VStack } from "@chakra-ui/react";
import { SideBarLogo } from "./logo";

import { SidebarList } from "./sidebar-list";

export const Sidebar = () => {
  return (
    <VStack h={"100vh"} w={"256px"} gap={0} display={["none", "flex"]}>
      <SideBarLogo />
      <SidebarList />
    </VStack>
  );
};
