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
    AdminOnly: false,
  },
  {
    name: "Inversiones",
    icon: <BiTrendingUp />,
    route: appRoutes.home.investments.url(),
    AdminOnly: false,
  },
  {
    name: "Billetera",
    icon: <BiWallet />,
    route: appRoutes.home.wallet.url(),
    AdminOnly: false,
  },
  {
    name: "Monedas",
    icon: <BiCoinStack />,
    route: appRoutes.home.currencies.url(),
    AdminOnly: true,
  },
  {
    name: "Configuraciones",
    icon: <BiWrench />,
    route: appRoutes.home.config.url(),
    AdminOnly: false,
  },
];
