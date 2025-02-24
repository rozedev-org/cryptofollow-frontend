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
  const { setIsLoggedIn, userLogged } = useUserSession();
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
              src={userLogged.picture || undefined}
              variant="solid"
              bg={"pink.250"}
              colorScheme={"pink"}
              w={"40px"}
              h={"40px"}
              borderRadius={"20px"}
            />
            <VStack alignItems={"start"}>
              <Text color={"black"}>
                {userLogged.firstName} {userLogged.lastName}
              </Text>
              <Text color={"gray.500"}>{userLogged.role}</Text>
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
            value="privacy"
            onClick={() => {
              router.push(appRoutes.home.privacyPolicy.url());
            }}
            p={2}
            borderTop={"sm"}
            borderColor={"gray.200"}
          >
            Politicas de Privacidad
          </MenuItem>
          <MenuItem value="logout" onClick={handleLogout} p={2}>
            Cerrar Sesion
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </>
  );
};
