"use client";
import { useUserSession } from "@/app/states/useUserId";
import { Flex } from "@chakra-ui/react";
import { MainContent } from "./content/content";
import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";

export const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoggedIn } = useUserSession();
  return (
    <Flex w={"100%"} data-component={"main-layout"} gap={4}>
      {/* Sidebar */}
      {isLoggedIn && <Sidebar />}
      <Flex w={"100%"} h={"100vh"} flexDir={"column"}>
        {/* Navbar */}
        {isLoggedIn && <Navbar />}
        {/* Content */}
        <MainContent>{children}</MainContent>
      </Flex>
    </Flex>
  );
};
