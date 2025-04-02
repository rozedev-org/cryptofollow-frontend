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
    adminOnly: false,
  },
  {
    name: "Inversiones",
    icon: <BiTrendingUp />,
    route: appRoutes.home.investments.url(),
    adminOnly: false,
  },
  {
    name: "Billetera",
    icon: <BiWallet />,
    route: appRoutes.home.wallet.url(),
    adminOnly: false,
  },
  {
    name: "Monedas",
    icon: <BiCoinStack />,
    route: appRoutes.home.currencies.url(),
    adminOnly: true,
  },
  {
    name: "Configuraciones",
    icon: <BiWrench />,
    route: appRoutes.home.config.url(),
    adminOnly: false,
  },
];
