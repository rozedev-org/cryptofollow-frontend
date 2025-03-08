"use client";
import { Box, IconButton, VStack } from "@chakra-ui/react";
import { SideBarLogo } from "./logo";

import { useResponsiveInfo } from "@/common/hook/useResponsiveInfo";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { SidebarList } from "./sidebar-list";

export const Sidebar = () => {
  const { isMobile, isTablet } = useResponsiveInfo();
  return (
    <aside>
      <VStack
        borderRightColor={"#e2e8f0"}
        borderRightWidth={"1px"}
        h={"100vh"}
        w={"256px"}
        gap={0}
        display={isMobile || isTablet ? "none" : "flex"}
        bg={"#ffffff"}
      >
        <SideBarLogo />
        <SidebarList />
      </VStack>
      <MobileSidebar />
    </aside>
  );
};

export const MobileSidebar = () => {
  const { isMobile, isTablet } = useResponsiveInfo();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  return (
    <Box
      position={isMobile || isTablet ? "absolute" : "none"}
      top={2}
      left={3}
      display={isMobile || isTablet ? "flex" : "none"}
    >
      <DrawerRoot
        placement={"start"}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            aria-label="Sidebar button"
            variant={"ghost"}
            h={10}
            w={4}
          >
            <BiMenu />
          </IconButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader pl={4}>
            <DrawerTitle>
              <SideBarLogo />
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody
            pl={4}
            pt={4}
            display={"flex"}
            justifyContent={"flex-start"}
          >
            <SidebarList onClose={onClose} />
          </DrawerBody>

          <DrawerCloseTrigger mt={3} bg={"pink.250"} />
        </DrawerContent>
      </DrawerRoot>
    </Box>
  );
};
