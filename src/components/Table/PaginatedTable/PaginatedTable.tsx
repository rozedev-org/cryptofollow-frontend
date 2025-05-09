import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { Box, Flex } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { ResponsiveDataTable } from "../ResponsiveTable/ResponsiveTable";
import { TablePagination } from "../TablePagination/TablePagination";
import style from "./PaginatedTable.module.css";
import { Field } from "@/components/ui/field";
import { PaginationMeta } from "@/common/interfaces/response.interface";

interface PaginatedTableProps<Data extends object> {
  meta: PaginationMeta;
  data: Data[];
  columns: ColumnDef<Data, any>[];
  handlePageChange: (selectedItem: { selected: number }) => void;
  handlePerRowsChange: (newPerPage: number, page: number) => Promise<void>;
  isLoadingData: boolean;
  height?: string;
}

export function PaginatedTable<Data extends object>(
  props: PaginatedTableProps<Data>
) {
  const {
    meta,
    data,
    handlePageChange,
    columns,
    handlePerRowsChange,
    isLoadingData,
    height,
  } = props;
  console.log("data IN TABLE :>> ", data);
  return (
    <Box w={"100%"}>
      <ResponsiveDataTable
        height={height}
        data={data}
        columns={columns}
        isLoadingData={isLoadingData}
      />

      <Flex
        w={"100%"}
        gap={2}
        justifyContent={"flex-end"}
        alignItems={"center"}
        className={style.paginatedTable}
      >
        <Box w={"15rem"}>
          <Field
            label="Filas por pagina:"
            display={"flex"}
            flexDirection={"row"}
          >
            <NativeSelectRoot borderRadius={5} alignItems={"center"}>
              <NativeSelectField
                pl={2}
                onChange={(e) => {
                  const newPerPage = parseInt(e.target.value);
                  handlePerRowsChange(newPerPage, meta.page);
                }}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
        </Box>
        <Box>
          {meta.page} - {meta.take} de {meta.itemCount}
        </Box>
        <TablePagination
          handlePageChange={handlePageChange}
          pageCount={meta.pageCount}
        />
      </Flex>
    </Box>
  );
}
