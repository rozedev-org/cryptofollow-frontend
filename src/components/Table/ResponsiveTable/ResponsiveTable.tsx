import { Box, chakra, Heading, Table } from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { LoadingTable } from "../../loading/LoadingPage";
import styles from "./ResponsiveTable.module.css";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  isLoadingData: boolean;
  height?: string;
};

export function ResponsiveDataTable<Data extends object>({
  data,
  columns,
  isLoadingData,
  height,
}: DataTableProps<Data>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <Box className={styles.scroll} style={{ height: height ? height : "40vh" }}>
      {isLoadingData && <LoadingTable />}

      {!isLoadingData && (
        <Table.Root
          stickyHeader
          // size={"sm"}

          className={`${styles.responsive}`}
        >
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={`table-header-group-row-${uuidv4()}`}>
                {headerGroup.headers.map((header) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  // const meta: any = header.column.columnDef.meta;

                  return (
                    <Table.ColumnHeader
                      key={`table-column-header-${uuidv4()}`}
                      onClick={header.column.getToggleSortingHandler()}
                      color={"#4a5568"}
                      py={"0.75rem"}
                      px={"1rem"}
                      fontWeight={600}
                      textAlign={"left"}
                      fontSize={"0.875rem"}
                      lineHeight={"1rem"}
                      bg="#f9fafb"
                      borderBottomColor={"#e2e8f066"}
                      borderBottomWidth={"1px"}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )?.toString()}

                      <chakra.span pl="4">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <FiChevronDown aria-label="sorted descending" />
                          ) : (
                            <FiChevronUp aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Table.ColumnHeader>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {data.length < 1 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={table.getAllColumns().length}
                  textAlign={"center"}
                >
                  <Heading color={"black"}>
                    No se han encontrado registros
                  </Heading>
                </Table.Cell>
              </Table.Row>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Table.Row key={`table-row-${uuidv4()}`}>
                  {row.getVisibleCells().map((cell) => {
                    // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                    // const meta: any = cell.column.columnDef.meta;
                    return (
                      <Table.Cell
                        py={"8px"}
                        px={"16px"}
                        key={`table-cell-${uuidv4()}`}
                        //isNumeric={meta?.isNumeric} revisar
                        data-label={cell.column.columnDef.header}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
}
