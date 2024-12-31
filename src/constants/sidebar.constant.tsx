'use client'
import { appRoutes } from "@/appRoutes";
import { SidebarButtonProps } from "@/components/layout/sidebar/sidebar-list";
import { HiSquares2X2, HiCreditCard, HiWallet, HiWrench } from "react-icons/hi2";

export const SIDEBAR_LIST: SidebarButtonProps[] = [
    { name: "Dashboard", Icon: HiSquares2X2, route: appRoutes.home.url() },
    {
      name: "Inversiones",
      Icon: HiCreditCard,
      route: appRoutes.home.investments.url(),
    },
    { name: "Billetera", Icon: HiWallet, route: appRoutes.home.wallet.url() },
    {
      name: "Configuraciones",
      Icon: HiWrench,
      route: appRoutes.home.config.url(),
    },
  ];
  
