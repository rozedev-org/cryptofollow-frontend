"use client";
import { Button } from "../../../components/ui/button";
import { InvestmentDialogDetail } from "./dialog-details";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../../components/ui/menu";

export interface InvestmentMenuProps {
  textButton?: string;
  iconButton?: React.ReactNode;
  currencyId: number;
}

export const InvestmentMenu = ({
  textButton,
  iconButton,
  currencyId,
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
          <MenuItem value="detail" onClick={() => console.log("oli")}>
            {/* <DrawerComponent title={'Detalle'} data={data}/> */}
            <InvestmentDialogDetail title="Detalle" currencyId={currencyId} />
          </MenuItem>
          <MenuItem value="edit" onClick={() => console.log("oli")}>
            Editar
          </MenuItem>
          <MenuItem value="delete" onClick={() => console.log("oli")}>
            Eliminar
          </MenuItem>
        </MenuContent>
      </MenuContent>
    </MenuRoot>
  );
};
