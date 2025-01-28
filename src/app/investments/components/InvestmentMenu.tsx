import { Button } from "@/components/ui/button";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/components/ui/menu";
import { InvestmentDialogDetail } from "./dialog-details";
import { InvestmentDialogDelete } from "./dialog-delete";
import { InvestmentDialogUpdate } from "./dialog-update";
import { InvestmentIdentity } from "../types/investment.types";

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
        <MenuItem value="detail" asChild>
          <InvestmentDialogDetail invest={invest} />
        </MenuItem>
        <MenuItem value="edit" asChild>
          <InvestmentDialogUpdate invest={invest} />
        </MenuItem>
        <MenuItem value="delete" asChild>
          <InvestmentDialogDelete invest={invest} />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
