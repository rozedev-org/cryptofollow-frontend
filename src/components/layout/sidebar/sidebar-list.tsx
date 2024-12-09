"use client";
import { Button } from "@/components/ui/button";
import { For, Link, VStack } from "@chakra-ui/react";
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

export const SIDEBAR_LIST: SidebarButtonProps[] = [
  { name: "Dashboard", Icon: HiSquares2X2, route: "dashboard" },
  { name: "Inversiones", Icon: HiCreditCard, route: "investments" },
  { name: "Billetera", Icon: HiWallet, route: "wallet" },
  { name: "Configuraciones", Icon: HiWrench, route: "config" },
];

export const SidebarList = ({
  sidebarList,
}: {
  sidebarList: SidebarButtonProps[];
}) => {
  return (
    <VStack gap={"32px"}>
      <For each={sidebarList} fallback={<div>Empty</div>}>
        {(item, index) => (
          <SidebarButton {...item} key={`Sidebar-item-${index}`} />
        )}
      </For>
    </VStack>
  );
};
