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
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { HiChevronDown } from "react-icons/hi2";

export const NavBarUserOptions = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useUserSession();
  const handleLogout = () => {
    axiosInstace.post(`/auth/logout`);
    router.push(appRoutes.home.login.url());
    setIsLoggedIn(false);
    window.location.reload();
  };
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton aria-label="Notifications" bg={"white"}>
          <HiChevronDown size={40} color="pink.250" />
        </IconButton>
      </MenuTrigger>

      <MenuContent>
        <MenuItem value="logout" onClick={handleLogout}>
          Cerrar Sesion
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
