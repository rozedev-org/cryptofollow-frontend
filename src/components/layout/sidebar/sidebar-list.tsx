"use client";
import { Button } from "@/components/ui/button";
import { For, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  HiCreditCard,
  HiSquares2X2,
  HiWallet,
  HiWrench,
} from "react-icons/hi2";

interface SidebarButtonProps {
  name: string;
  Icon: IconType;
}

const SidebarButton = ({ name, Icon }: SidebarButtonProps) => {
  return (
    <Button
      onClick={() => console.log("Button clicked")}
      display={"flex"}
      justifyContent={"flex-start"}
      paddingLeft={"12px"}
      bg={"#D6B9C2"}
      borderRadius={"10px"}
      w={"197px"}
      h={"50px"}
      fontSize={"14px"}
      fontWeight={"600"}
    >
      {<Icon />} {name}
    </Button>
  );
};

const SIDEBAR_LIST: SidebarButtonProps[] = [
  { name: "Dashboard", Icon: HiSquares2X2 },
  { name: "Inversiones", Icon: HiCreditCard },
  { name: "Billetera", Icon: HiWallet },
  { name: "Configuraciones", Icon: HiWrench },
];

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
