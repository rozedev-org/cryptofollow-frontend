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
import { useInvestment } from "../hook/useInvestment";

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
  const { fetchInvest, invest } = useInvestment(investId);
  const handleFetchInvest = () => {
    if (invest.id === 0) {
      fetchInvest();
    }
  };
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
          onClick={handleFetchInvest}
        >
          {iconButton && iconButton}
          {textButton && textButton}
        </Button>
      </MenuTrigger>

      <MenuContent>
        <MenuItem value="detail">
          <InvestmentDialogDetail title="Detalle" invest={invest} />
        </MenuItem>
        <MenuItem value="edit">
          <InvestmentDialogUpdate title="Editar" invest={invest} />
        </MenuItem>
        <MenuItem value="delete">
          <InvestmentDialogDelete
            title="Eliminar"
            invest={invest}
            investId={investId}
          />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
