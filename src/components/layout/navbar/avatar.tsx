import { Avatar } from "@/components/ui/avatar";
import { HStack, IconButton } from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi2";

export const NavbarAvatar = () => {
  return (
    <HStack gap={"15px"}>
      <Avatar
        variant="solid"
        name="Juan Carlos Jimenez"
        bg={"#E7CBD2"}
        w={"40px"}
        h={"40px"}
        borderRadius={"10px"}
      />

      <IconButton aria-label="Notifications" bg={"#FFFFFF"}>
        <HiChevronDown size={40} color="#E7CBD2" />
      </IconButton>
    </HStack>
  );
};
