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

export function DataTable({ title, columns, onLoad, onSelection }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const handleSelection = (selection) => {
    debugger
    if (selection === "all") {
      setSelectedKeys(new Set([]))
      return
    }

    const lastItem = Array.from(selection)?.at(-1);
    
    if (onSelection) {
      if (onSelection(lastItem)) {
        setSelectedKeys(new Set([lastItem]));
      }
    } else {
      setSelectedKeys(new Set([lastItem]));
    }
  };

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
      selectionMode="multiple"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelection}
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
                <TableCell width={column?.width} className={column?.className}>
                  {column?.template
                    ? column.template(getKeyValue(item, columnKey) ?? item, item)
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
