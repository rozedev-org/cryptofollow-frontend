import { Flex, FlexProps, Spinner, SpinnerProps } from "@chakra-ui/react";

interface LoaderProps {
  flexProps?: FlexProps;
  spinnerProps?: SpinnerProps;
}

export const Loader = ({ flexProps, spinnerProps }: LoaderProps) => {
  return (
    <Flex w={"100%"} {...flexProps}>
      <Spinner mx={"auto"} size="lg" {...spinnerProps} />
    </Flex>
  );
};
