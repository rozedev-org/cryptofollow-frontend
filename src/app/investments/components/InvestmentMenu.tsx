/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "../../../components/ui/button";
import { InvestmentDialogDetail } from "./dialog-details";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../../components/ui/menu";
import { InvestmentDialogDelete } from "./dialog-delete";
import { InvestmentDialogUpdate } from "./dialog-update";
import { InvestmentIdentity } from "../types/crypto.types";

export interface InvestmentMenuProps {
  textButton?: string;
  iconButton?: React.ReactNode;
  invest: InvestmentIdentity;
}

export const InvestmentMenu = ({
  textButton,
  iconButton,
  invest,
}: InvestmentMenuProps) => {
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
        <MenuItem value="detail">
          <InvestmentDialogDetail invest={invest} />
        </MenuItem>
        <MenuItem value="edit">
          <InvestmentDialogUpdate invest={invest} />
        </MenuItem>
        <MenuItem value="delete">
          <InvestmentDialogDelete invest={invest} />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
