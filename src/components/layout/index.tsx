"use client";
import { useUserSession } from "@/app/states/useUserId";
import { Flex } from "@chakra-ui/react";
import { MainContent } from "./content/content";
import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";
import { useEffect, useState } from "react";
import { LoadItem } from "./loading";

export const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoggedIn } = useUserSession();
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    setLoadingPage(false);
  }, []);

  return (
    <Flex w={"100%"} data-component={"main-layout"} gap={0}>
      {loadingPage && <LoadItem />}
      {!loadingPage && (
        <>
          {/* Sidebar */}
          {isLoggedIn && <Sidebar />}
          <Flex w={"100%"} flexDir={"column"}>
            {/* Navbar */}
            {isLoggedIn && <Navbar />}
            {/* Content */}
            <MainContent>{children}</MainContent>
          </Flex>
        </>
      )}
    </Flex>
  );
};
