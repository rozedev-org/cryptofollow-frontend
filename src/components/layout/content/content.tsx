import { Flex } from "@chakra-ui/react";

export const MainContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Flex w={"100%"} data-component={"content"}>
      {children}
    </Flex>
  );
};
