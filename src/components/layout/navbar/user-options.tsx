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
import { useUser } from "@/app/config/users/hook/useUsers";
import { useEffect } from "react";

export const NavBarUserOptions = () => {
  const router = useRouter();
  const { setIsLoggedIn, id } = useUserSession();
  const { user, fetchUser } = useUser(id);
  const handleLogout = () => {
    try {
      axiosInstace.post(`/auth/logout`);
      setIsLoggedIn(false);
      router.push(appRoutes.home.login.url());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton aria-label="Notifications" bg={"white"}>
            <Avatar
              src={user.picture || undefined}
              variant="solid"
              bg={"pink.250"}
              colorScheme={"pink"}
              w={"40px"}
              h={"40px"}
              borderRadius={"20px"}
            />
            <VStack alignItems={"start"}>
              <Text color={"black"}>
                {user.firstName} {user.lastName}
              </Text>
              <Text color={"gray.500"}>{user.role}</Text>
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
