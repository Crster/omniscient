import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React from "react";

export function DataTable({
  title,
  columns,
  rows,
  selectionMode,
  onSelectionChange,
}) {
  return (
    <Table
      aria-label={title}
      classNames={{
        thead: "[&>tr]:first:shadow-none",
        th: "text-gray-500 bg-transparent font-medium text-base",
        td: [
          "border-t border-b text-base",
          // changing the rows border radius
          // first
          "group-data-[first=true]:first:before:rounded-none",
          "group-data-[first=true]:last:before:rounded-none",
          // middle
          "group-data-[middle=true]:before:rounded-none",
          // last
          "group-data-[last=true]:first:before:rounded-none",
          "group-data-[last=true]:last:before:rounded-none",
        ],
      }}
      removeWrapper
      color="default"
      selectionMode={selectionMode}
      onSortChange={rows.sort}
      sortDescriptor={rows.sortDescriptor}
      selectedKeys={rows.initialSelectedKeys}
      onSelectionChange={onSelectionChange}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={column.allowsSorting}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={rows.items}
        isLoading={rows.isLoading}
        emptyContent={"No rows to display."}
        loadingContent={<p>Loading...</p>}
      >
        {(item) => (
          <TableRow key={item.rowId}>
            {(columnKey) => {
              const column = columns.find((ii) => ii.key === columnKey);

              return (
                <TableCell className={column?.className}>
                  {column?.template
                    ? column.template(item)
                    : getKeyValue(item, columnKey)}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
