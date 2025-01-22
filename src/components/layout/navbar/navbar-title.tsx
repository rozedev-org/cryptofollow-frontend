"use client";
import { Heading } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export const NavbarTranslate = [{ key: "dashboard", value: "Dashboard" }];

export const getNavbarTranslate = (key: string) => {
  const value = NavbarTranslate.find((x) => x.key == key)?.value;
  return value ?? key;
};

const getPageTitle = () => {
  //eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();
  const items = pathname.split("/");
  const unformatedTitle = items[items.length - 1];
  return getNavbarTranslate(unformatedTitle);
};

export const NavbarTitle = () => {
  return (
    <Heading
      color={"#1A1B2F"}
      fontSize={"24px"}
      fontWeight={"600"}
      lineHeight={"normal"}
      fontStyle={"normal"}
    >
      {getPageTitle()}
    </Heading>
  );
};
