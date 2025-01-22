import { Avatar } from "@/components/ui/avatar";
import { HStack } from "@chakra-ui/react";

export const NavbarAvatar = () => {
  return (
    <HStack gap={"15px"}>
      <Avatar
        variant="solid"
        name="Juan Carlos Jimenez"
        bg={"pink.250"}
        colorScheme={"pink"}
        w={"40px"}
        h={"40px"}
        borderRadius={"10px"}
      />
    </HStack>
  );
};
