"use client";
import { axiosInstace } from "@/common/axiosInstace";
import { useUserSession } from "@/app/states/useUserId";
import { appRoutes } from "@/appRoutes";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { IconButton, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { HiChevronDown } from "react-icons/hi2";
import { Avatar } from "@/components/ui/avatar";

export const NavBarUserOptions = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useUserSession();
  const handleLogout = () => {
    try {
      axiosInstace.post(`/auth/logout`);
      setIsLoggedIn(false);
      router.push(appRoutes.home.login.url());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton aria-label="Notifications" bg={"white"}>
            <Avatar
              variant="solid"
              name="Juan Carlos Jimenez"
              bg={"pink.250"}
              colorScheme={"pink"}
              w={"40px"}
              h={"40px"}
              borderRadius={"20px"}
            />
            <VStack alignItems={"start"}>
              <Text color={"black"}>Juan Jimenez</Text>
              <Text color={"gray.500"}>Admin</Text>
            </VStack>
            <HiChevronDown size={40} color="black" />
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem
            value="profile"
            p={2}
            onClick={() => {
              router.push(appRoutes.home.profile.url());
            }}
          >
            Perfil
          </MenuItem>
          <MenuItem
            value="logout"
            onClick={handleLogout}
            p={2}
            borderTop={"sm"}
            borderColor={"gray.200"}
          >
            Cerrar Sesion
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </>
  );
};
