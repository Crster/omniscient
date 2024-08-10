"use client";

import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { useState } from "react";
import { useAsyncList } from "@react-stately/data";

export function DataTable({ title, columns, onLoad }) {
  const [isLoading, setIsLoading] = useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      let results = [];

      if (onLoad) {
        results = await onLoad(signal);
        setIsLoading(false);
      }

      return {
        items: results,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label={title}
      classNames={{
        thead: "[&>tr]:first:shadow-none",
        th: "text-gray-500 bg-transparent font-medium text-base",
        td: "rouded-0 border-t border-b text-base",
      }}
      isHeaderSticky
      removeWrapper
      color="default"
      selectionMode="multiple"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader>
        {columns?.map((ii) => (
          <TableColumn key={ii.name} allowsSorting={ii.sortable}>
            {ii.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={isLoading}
        emptyContent={"No rows to display."}
        loadingContent={<p>Loading...</p>}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              const column = columns.find((ii) => ii.name === columnKey);

              return (
                <TableCell className={column?.className}>
                  {column?.template
                    ? column.template(getKeyValue(item, columnKey))
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
