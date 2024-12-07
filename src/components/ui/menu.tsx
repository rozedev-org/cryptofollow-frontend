"use client";
import { CryptoData } from "@/app/investments/page";
import {
  MenuRoot,
  MenuTrigger,
  Button,
  MenuContent,
  MenuItem,
} from "@chakra-ui/react";
import type { MenuRootProps as ChakraMenuRootProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { DialogComponent } from "./dialog-details";

interface MenuProps {
  index: number;
  data: CryptoData[];
}

export interface MenuRootProps extends ChakraMenuRootProps, MenuProps {}

export const Menu = forwardRef<HTMLMenuElement, MenuProps>(function Menu(
  props
) {
  const { index, data } = props;

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
          <BiDotsHorizontal color="black" />
        </Button>
      </MenuTrigger>
      <MenuContent position={"absolute"}>
        <MenuItem value="detail" onClick={() => console.log(data[index])}>
          {/* <DrawerComponent title={'Detalle'} data={data}/> */}
          <DialogComponent title="Detalle" data={data[index]} />
        </MenuItem>
        <MenuItem value="edit" onClick={() => console.log(index)}>
          Editar
        </MenuItem>
        <MenuItem value="delete" onClick={() => console.log(index)}>
          Eliminar
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
});
