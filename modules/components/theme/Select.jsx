"use client";

import { Radio, RadioGroup } from "@nextui-org/radio";
import * as Option from "@nextui-org/select";
import { useEffect, useState } from "react";

export function Select({ items, selectedKeys, onSelectionChange, ...props }) {
  const [keys, setKeys] = useState(new Set([]));

  useEffect(() => {
    if (selectedKeys) {
      if (Array.isArray(selectedKeys)) {
        setKeys(new Set(selectedKeys));
      } else {
        setKeys(new Set([selectedKeys]));
      }
    }
  }, [selectedKeys]);

  const handleOnSelect = (selection) => {
    if (Array.isArray(selectedKeys)) {
      onSelectionChange(Array.from(selection));
    } else {
      const [selected] = selection;
      onSelectionChange(selected);
    }
  };

  return (
    <Option.Select
      color="primary"
      classNames={{
        label: "text-black",
        value: "text-black",
      }}
      labelPlacement="outside"
      {...props}
      selectedKeys={keys}
      onSelectionChange={handleOnSelect}
    >
      {items.map((item) => (
        <Option.SelectItem key={item.key}>{item.label}</Option.SelectItem>
      ))}
    </Option.Select>
  );
}

export function RadioSelect({
  items,
  selectedKeys,
  onSelectionChange,
  ...props
}) {
  return (
    <RadioGroup
      className="text-xl"
      classNames={{ label: "text-400" }}
      orientation="horizontal"
      {...props}
    >
      {items.map((item) => (
        <Radio key={item.key} value={item.key}>
          {item.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
