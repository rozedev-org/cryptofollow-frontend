"use client";
import { appRoutes } from "@/appRoutes";
import { SidebarButtonProps } from "@/components/layout/sidebar/sidebar-list";
import { BiCoinStack } from "react-icons/bi";
import { HiCreditCard, HiSquares2X2, HiWallet } from "react-icons/hi2";

export const SIDEBAR_LIST: SidebarButtonProps[] = [
  { name: "Dashboard", Icon: HiSquares2X2, route: appRoutes.home.url() },
  {
    name: "Inversiones",
    Icon: HiCreditCard,
    route: appRoutes.home.investments.url(),
  },
  { name: "Billetera", Icon: HiWallet, route: appRoutes.home.wallet.url() },
  // {
  //   name: "Configuraciones",
  //   Icon: HiWrench,
  //   route: appRoutes.home.config.url(),
  // },
  {
    name: "Monedas",
    Icon: BiCoinStack,
    route: appRoutes.home.currencies.url(),
  },
  // {
  //   name: "Configuraciones",
  //   Icon: HiWrench,
  //   route: appRoutes.home.config.url(),
  // },
];
