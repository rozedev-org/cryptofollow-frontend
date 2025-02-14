import { Flex, Spinner } from "@chakra-ui/react";

export const LoadItem = () => {
  return (
    <>
      <Flex
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        align="center"
        justify="center"
        bg="rgba(0, 0, 0, 0.3)"
        zIndex="9999"
      >
        <Spinner size="xl" color="blue.500" />
      </Flex>
    </>
  );
};
