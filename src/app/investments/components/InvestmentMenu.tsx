import { InvestmentDialogDetail } from "./dialog-details";
import { InvestmentDialogDelete } from "./dialog-delete";
import { InvestmentDialogUpdate } from "./dialog-update";
import { InvestmentIdentity } from "../types/investment.types";
import { Menu } from "@chakra-ui/react";
import { BiDotsHorizontal } from "react-icons/bi";
import { Button } from "@/components/ui/button";

export interface InvestmentMenuProps {
  invest: InvestmentIdentity;
}

export const InvestmentMenu = ({ invest }: InvestmentMenuProps) => {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button
          id="menu-table"
          w={"20px"}
          h={"18px"}
          bg="#ffffff"
          _hover={{ bg: "#cccccc" }}
          ml={"11px"}
          mr={"36px"}
          asChild
        >
          <BiDotsHorizontal color="black" />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="detail" asChild>
            <InvestmentDialogDetail invest={invest} />
          </Menu.Item>
          <Menu.Item value="edit" asChild>
            <InvestmentDialogUpdate invest={invest} />
          </Menu.Item>
          <Menu.Item value="delete" asChild>
            <InvestmentDialogDelete invest={invest} />
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
