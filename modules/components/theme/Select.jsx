import * as Option from "@nextui-org/select";

export function Select({ items, value, ...props }) {
  const selectedItem = items?.find((ii) => ii.key === value);
  console.log({
    selectedItem,
    items,
    value
  })

  return (
    <Option.Select
      color="primary"
      classNames={{
        label: "text-black",
        value: selectedItem ? "text-black" : "text-gray-400",
      }}
      labelPlacement="outside"
      items={items}
      defaultSelectedKeys={new Set([selectedItem?.key])}
      {...props}
    >
      {items && ((item) => (
        <Option.SelectItem key={item.key}>{item.value}</Option.SelectItem>
      ))}
    </Option.Select>
  );
}
