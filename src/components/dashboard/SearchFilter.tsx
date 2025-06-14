import { Input } from "@chakra-ui/react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { InputGroup } from "../ui/input-group";
import { useFilterStore } from "@/app/states/useFilterData";
import { useHandleData } from "@/app/states/useHandleData";

export const SearchFilter = () => {
  const { filter, saveFilter, clearFilter } = useFilterStore();
  const { handleRefreshSignal } = useHandleData();
  return (
    <>
      <InputGroup
        id="00000000000000000000000"
        w={"240px"}
        h={"36px"}
        py={"0.5rem"}
        flex="1"
        startElementProps={{ padding: "11px 15px 11px 11px" }}
        endElementProps={{ padding: "11px 15px 11px 11px" }}
        startElement={<HiMagnifyingGlass size={18} />}
        endElement={
          <HiXMark
            cursor={"pointer"}
            size={18}
            onClick={() => {
              clearFilter();
              handleRefreshSignal(true);
            }}
          />
        }
        display={["none", "flex"]}
      >
        <Input
          bg={"#f1f5f9"}
          ml={"auto"}
          borderRadius={"xl"}
          border={"none"}
          placeholder="Buscar..."
          _placeholder={{
            color: "#C9C9C9",
            fontSize: "14px",
            fontWeight: "500",
          }}
          value={filter}
          onChange={(e) => {
            saveFilter(e.target.value);
          }}
        />
      </InputGroup>
    </>
  );
};
