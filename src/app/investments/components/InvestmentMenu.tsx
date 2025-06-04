import { InvestmentDialogDetail } from "./dialog-details";
import { InvestmentDialogDelete } from "./dialog-delete";
import { InvestmentDialogUpdate } from "./dialog-update";
import { InvestmentIdentity } from "../types/investment.types";
import { BiDotsHorizontal } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Menu } from "@chakra-ui/react";

export interface InvestmentMenuProps {
  invest: InvestmentIdentity;
}

export const InvestmentMenu = ({ invest }: InvestmentMenuProps) => {
  return (
    //This div is necessary for the driver.js library to work correctly
    <div id="menu-table">
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            w={"20px"}
            h={"18px"}
            bg="#ffffff"
            _hover={{ bg: "#cccccc" }}
            ml={"11px"}
            mr={"36px"}
            variant={"outline"}
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
    </div>
  );
};
