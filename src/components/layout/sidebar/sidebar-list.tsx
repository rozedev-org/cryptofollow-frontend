"use client";
import { Button } from "@/components/ui/button";
import { For, Link, VStack } from "@chakra-ui/react";
import { SIDEBAR_LIST } from "@/constants/sidebar.constant";
import { IconType } from "react-icons";

export interface SidebarButtonProps {
  name: string;
  Icon: IconType;
  route: string;
}
const SidebarButton = ({ name, Icon, route }: SidebarButtonProps) => {
  return (
    <Link href={route}>
      <Button
        onClick={() => console.log("Button clicked")}
        display={"flex"}
        justifyContent={"flex-start"}
        paddingLeft={"12px"}
        colorPalette={"pink"}
        borderRadius={"10px"}
        w={"197px"}
        h={"50px"}
        fontSize={"14px"}
        fontWeight={"600"}
      >
        {<Icon />} {name}
      </Button>
    </Link>
  );
};

export const SidebarList = () => {
  return (
    <VStack gap={"32px"}>
      <For each={SIDEBAR_LIST} fallback={<div>Empty</div>}>
        {(item, index) => (
          <SidebarButton {...item} key={`Sidebar-item-${index}`} />
        )}
      </For>
    </VStack>
  );
};
