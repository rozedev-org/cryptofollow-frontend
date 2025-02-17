import { Button } from "@/components/ui/button";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@/components/ui/menu";
import { CurrencyDialogDetail } from "./currency-detail";
import { CurrencyDialogUpdate } from "./currency-update";
import { CurrencyDialogDelete } from "./currency-delete";
import { CurrencyIdentity } from "../types/currency.types";
export interface CurrencyMenuProps {
  textButton?: string;
  iconButton?: React.ReactNode;
  currency: CurrencyIdentity;
}
export const CurrencyMenu = ({
  textButton,
  iconButton,
  currency,
}: CurrencyMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          id="menu-table"
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
          <CurrencyDialogDetail currency={currency} />
        </MenuItem>
        <MenuItem value="edit" asChild>
          <CurrencyDialogUpdate currency={currency} />
        </MenuItem>
        <MenuItem value="delete" asChild>
          <CurrencyDialogDelete currency={currency} />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
