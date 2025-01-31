"use client";
import { SIDEBAR_LIST } from "@/constants/sidebar.constant";
import { For, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export interface SidebarButtonProps {
  name: string;
  Icon: IconType;
  route: string;
  onClose?: () => void;
}
const SidebarButton = ({ name, route, onClose }: SidebarButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
    onClose && onClose();
  };

  return (
    <Button
      paddingLeft={"12px"}
      justifyContent={"start"}
      borderRadius={"10px"}
      colorPalette={"pink"}
      w={"197px"}
      h={"50px"}
      fontSize={"14px"}
      fontWeight={"600"}
      color={"white"}
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};

export interface SidebarListProps {
  onClose?: () => void;
}
export const SidebarList = ({ onClose }: SidebarListProps) => {
  return (
    <VStack gap={"32px"}>
      <For each={SIDEBAR_LIST} fallback={<div>Empty</div>}>
        {(item, index) => (
          <SidebarButton
            {...item}
            key={`Sidebar-item-${index}`}
            onClose={onClose}
          />
        )}
      </For>
    </VStack>
  );
};
