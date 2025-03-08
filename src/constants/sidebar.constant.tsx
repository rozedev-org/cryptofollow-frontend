"use client";
import { appRoutes } from "@/appRoutes";
import { SidebarButtonProps } from "@/components/layout/sidebar/sidebar-list";
import {
  BiCoinStack,
  BiSolidDashboard,
  BiTrendingUp,
  BiWallet,
  BiWrench,
} from "react-icons/bi";

export const SIDEBAR_LIST: SidebarButtonProps[] = [
  {
    name: "Dashboard",
    icon: <BiSolidDashboard />,
    route: appRoutes.home.url(),
  },
  {
    name: "Inversiones",
    icon: <BiTrendingUp />,
    route: appRoutes.home.investments.url(),
  },
  { name: "Billetera", icon: <BiWallet />, route: appRoutes.home.wallet.url() },
  {
    name: "Monedas",
    icon: <BiCoinStack />,
    route: appRoutes.home.currencies.url(),
  },
  {
    name: "Configuraciones",
    icon: <BiWrench />,
    route: appRoutes.home.config.url(),
  },
];
