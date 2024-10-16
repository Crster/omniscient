import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow,
} from "@nextui-org/table";
import { AsyncListData } from "@react-stately/data";
import React from "react";

export interface DataTableColumn<TModel> {
  key: (string & keyof TModel) | "action";
  label: string;
  allowsSorting?: boolean;
  className?: string;
  template?: (item: TModel) => React.ReactNode;
}

export interface DataTableProps<TModel> extends TableProps {
  title: string;
  keyField?: string;
  columns: Array<DataTableColumn<TModel>>;
  rows: AsyncListData<TModel>;
}

export function DataTable<TModel extends Record<string, any>>(props: DataTableProps<TModel>) {
  const dataKey = props.keyField ?? "id";

  return (
    <Table
      removeWrapper
      aria-label={props.title}
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
      color="default"
      selectedKeys={props.rows.selectedKeys}
      selectionMode={props.selectionMode}
      sortDescriptor={props.rows.sortDescriptor}
      onSelectionChange={props.onSelectionChange}
      onSortChange={props.rows.sort}
    >
      <TableHeader columns={props.columns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={column.allowsSorting}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No rows to display."}
        isLoading={props.rows.isLoading}
        items={props.rows.items}
        loadingContent={<p>Loading...</p>}
      >
        {(item) => (
          <TableRow key={item[dataKey]}>
            {(columnKey) => {
              const column = props.columns.find((ii) => ii.key === columnKey);

              return (
                <TableCell className={column?.className}>
                  {column?.template ? column.template(item) : getKeyValue(item, columnKey)}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
