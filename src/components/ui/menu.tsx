"use client";
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

interface MenuProps {
  id?: string;
}

export interface MenuRootProps extends ChakraMenuRootProps, MenuProps {}

export const Menu = forwardRef<HTMLMenuElement, MenuProps>(function Menu(
  props
) {
  const { id } = props;
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
        <MenuItem value="1" onClick={() => console.log(id)}>
          Detalle
        </MenuItem>
        <MenuItem value="2" onClick={() => console.log(id)}>
          Editar
        </MenuItem>
        <MenuItem value="2" onClick={() => console.log(id)}>
          Eliminar
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
});
