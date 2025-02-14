"use client";
import { Button } from "@/components/ui/button";
import { FiChevronRight } from "react-icons/fi";
import { HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface ConfigButtonProps {
  title: string;
  route: string;
}
export const ConfigButton = ({ route, title }: ConfigButtonProps) => {
  const router = useRouter();
  return (
    <HStack>
      <Button
        p={3}
        minW={"40vw"}
        justifyContent={"flex-start"}
        borderRadius="lg"
        onClick={() => {
          router.push(route);
        }}
      >
        <FiChevronRight />
        <Text fontWeight="bold">{title}</Text>
      </Button>
    </HStack>
  );
};
