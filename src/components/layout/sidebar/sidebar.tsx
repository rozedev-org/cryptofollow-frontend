"use client";
import { Box, IconButton, VStack } from "@chakra-ui/react";
import { SideBarLogo } from "./logo";

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
import { BiGridVertical } from "react-icons/bi";
import { SidebarList } from "./sidebar-list";
import { useState } from "react";

export const Sidebar = () => {
  return (
    <>
      <VStack h={"100vh"} w={"256px"} gap={0} display={["none", "flex"]}>
        <SideBarLogo />
        <SidebarList />
      </VStack>
      <MobileSidebar />
    </>
  );
};

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  return (
    <Box
      position={["absolute", "none"]}
      top={7}
      left={3}
      display={["flex", "none"]}
    >
      <DrawerRoot
        placement={"start"}
        size={"full"}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton aria-label="Search database" bg={"pink.250"}>
            <BiGridVertical />
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
