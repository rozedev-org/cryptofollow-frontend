import { VStack } from "@chakra-ui/react";
import { SideBarLogo } from "./logo";
import { SidebarList } from "./sidebar-list";

export const Sidebar = () => {
  return (
    <VStack h={"100vh"} w={"256px"} gap={"55px"}>
      <SideBarLogo />
      <SidebarList />
    </VStack>
  );
};
