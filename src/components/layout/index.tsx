import { HStack, VStack } from "@chakra-ui/react";
import { Navbar } from "./navbar/navbar";
import { Sidebar } from "./sidebar/sidebar";

export const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <HStack alignItems={"flex-start"}>
      {/* Sidebar */}
      <Sidebar />
      <VStack>
        {/* Navbar */}
        <Navbar />
        {/* Content */}
        {children}
      </VStack>
    </HStack>
  );
};
