import { Flex, FlexProps } from "@chakra-ui/react";

interface BasePageProps extends FlexProps {}
export const BasePage = (props: BasePageProps) => {
  return (
    <Flex
      w={"100%"}
      data-component={"base-page"}
      overflowX="auto"
      p={[2, 0]}
      {...props}
    >
      {props.children}
    </Flex>
  );
};
