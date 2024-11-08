import { InputGroup } from "@/components/ui/input-group";
import { Input } from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export const SearchButton = () => {
  return (
    <InputGroup
      h={"40px"}
      flex="1"
      endElementProps={{ padding: "11px 15px 11px 11px" }}
      endElement={<HiMagnifyingGlass size={18} />}
    >
      <Input
        ml={"auto"}
        w={"258px"}
        borderRadius={"10px"}
        border={"1px solid var(--Stroke, #E9E9E9)"}
        placeholder="Buscar..."
        pl={"15px"}
        pt={"10px"}
        pb={"10px"}
        _placeholder={{
          color: "#C9C9C9",
          fontSize: "12px",
          fontWeight: "400",
        }}
      />
    </InputGroup>
  );
};
