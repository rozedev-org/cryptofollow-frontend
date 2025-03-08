"use client";
import { useUserSession } from "@/app/states/useUserId";
import { appRoutes } from "@/appRoutes";
import { axiosInstace } from "@/common/axiosInstace";
import { Avatar } from "@/components/ui/avatar";
import { ColorModeIcon, useColorMode } from "@/components/ui/color-mode";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { IconButton, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const NavBarUserOptions = () => {
  const { toggleColorMode } = useColorMode();

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
            <VStack alignItems={"end"}>
              <Text color={"black"} fontSize={"sm"}>
                {userLogged.firstName} {userLogged.lastName}
              </Text>

              <Text color={"gray.500"}>{userLogged.role}</Text>
            </VStack>
            <Avatar
              size={"sm"}
              colorPalette={"pink"}
              bg={"pink.50"}
              shape="rounded"
              borderRadius={"20px"}
              name={`${userLogged.firstName} ${userLogged.lastName}`}
            />
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

          <MenuItem value="colorMode" p={2} onClick={toggleColorMode}>
            <ColorModeIcon />
            Color mode
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
