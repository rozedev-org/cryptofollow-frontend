import React from "react";
import { Clipboard, IconButton } from "@chakra-ui/react";
import { BiCopy } from "react-icons/bi";

export const CustomClipboard = ({ value }: { value: string | number }) => {
  return (
    <Clipboard.Root value={value.toString()}>
      <Clipboard.Trigger asChild>
        <IconButton variant="surface" size="xs">
          <BiCopy />
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  );
};
