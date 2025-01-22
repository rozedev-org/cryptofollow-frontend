"use client";
import { HStack, VStack } from "@chakra-ui/react";
import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";
import { useUserSession } from "@/app/states/useUserId";

export const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoggedIn } = useUserSession();
  return (
    <HStack alignItems={"flex-start"}>
      {/* Sidebar */}
      {isLoggedIn && <Sidebar />}
      <VStack>
        {/* Navbar */}
        {isLoggedIn && <Navbar />}
        {/* Content */}
        {children}
      </VStack>
    </HStack>
  );
};
