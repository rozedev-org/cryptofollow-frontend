import { Button } from "@/components/ui/button";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/components/ui/menu";
import { UserEntity } from "../types/users.types";
import { UserDialogDelete } from "./user-delete";
import { UserDialogUpdate } from "./user-update";

export interface UserMenuProps {
  textButton?: string;
  iconButton?: React.ReactNode;
  user: UserEntity;
}

export const UsersMenu = ({ textButton, iconButton, user }: UserMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          w={"20px"}
          h={"18px"}
          bg="#ffffff"
          _hover={{ bg: "#cccccc" }}
          ml={"11px"}
          mr={"36px"}
        >
          {iconButton && iconButton}
          {textButton && textButton}
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="edit" asChild>
          <UserDialogUpdate user={user} />
        </MenuItem>
        <MenuItem value="delete" asChild>
          <UserDialogDelete user={user} />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
