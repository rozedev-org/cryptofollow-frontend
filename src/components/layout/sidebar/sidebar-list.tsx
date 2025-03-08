"use client";
import { SIDEBAR_LIST } from "@/constants/sidebar.constant";
import { For, VStack } from "@chakra-ui/react";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
export interface SidebarButtonProps {
  name: string;
  icon: ReactNode;
  route: string;
  onClose?: () => void;
}
const SidebarButton = ({ name, route, onClose, icon }: SidebarButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    setIsActive(false);
    router.push(route);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    setIsActive(pathname === route);
  }, [pathname]);

  return (
    <Button
      justifyContent={"start"}
      borderRadius={"10px"}
      colorPalette={isActive ? "pink" : "gray"}
      variant={isActive ? "solid" : "ghost"}
      _active={{ bg: "pink.solid" }}
      w={"100%"}
      fontSize={"0.875rem"}
      fontWeight={"500"}
      color={isActive ? "white" : "rgba(2, 8, 23, 0.7)"}
      p={".75rem"}
      lineHeight={"1.25rem"}
      onClick={handleClick}
    >
      {icon}
      {name}
    </Button>
  );
};

export interface SidebarListProps {
  onClose?: () => void;
}
export const SidebarList = ({ onClose }: SidebarListProps) => {
  return (
    <VStack gap={"4px"} w={"100%"} paddingTop={"1rem"} px="12px">
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
