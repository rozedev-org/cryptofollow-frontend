import { IconButton } from "@chakra-ui/react";
import { HiOutlineBell } from "react-icons/hi2";

export const NotificationButton = () => {
  return (
    <IconButton aria-label="Notifications" bg={"#FFFFFF"}>
      <HiOutlineBell size={24} color="#C9C9C9" />
    </IconButton>
  );
};
