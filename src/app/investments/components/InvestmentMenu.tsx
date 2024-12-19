import { Button } from "../../../components/ui/button";
import { InvestmentDialogDetail } from "./dialog-details";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../../components/ui/menu";
import { InvestmentDialogDelete } from "./dialog-delete";

export interface InvestmentMenuProps {
  textButton?: string;
  iconButton?: React.ReactNode;
  investId: number;
}

export const InvestmentMenu = ({
  textButton,
  iconButton,
  investId,
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
        <MenuContent>
          <MenuItem value="detail">
            <InvestmentDialogDetail title="Detalle" investId={investId} />
          </MenuItem>
          <MenuItem value="edit" onClick={() => console.log("oli")}>
            Editar
          </MenuItem>
          <MenuItem value="delete">
            <InvestmentDialogDelete title="Eliminar" investId={investId} />
          </MenuItem>
        </MenuContent>
      </MenuContent>
    </MenuRoot>
  );
};
