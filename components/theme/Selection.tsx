import { Radio, RadioGroup, RadioGroupProps } from "@heroui/radio";
import { Select, SelectItem, SelectProps } from "@heroui/select";

import { KeyLabel } from "@/libraries/EnumUtil";

export function Selection(
  props: Omit<SelectProps, "children"> & {
    items: Array<KeyLabel>;
    onValueChange?: (value: any) => void;
  },
) {
  const { items, ...otherProps } = props;

  return (
    <Select
      classNames={{
        label: "text-black",
        value: "text-black",
      }}
      color="primary"
      labelPlacement="outside"
      selectionMode="single"
      onChange={(e) => (props.onValueChange ? props.onValueChange(e.target.value) : undefined)}
      {...otherProps}
    >
      {items.map((item) => (
        <SelectItem key={item.key} value={item.key}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}

export function SecondarySelection(
  props: Omit<SelectProps, "children"> & {
    items: Array<KeyLabel>;
    onValueChange?: (value: any) => void;
  },
) {
  return (
    <Selection
      classNames={{
        label: "text-gray-400 text-xl",
      }}
      variant="underlined"
      {...props}
    />
  );
}

export function RadioSelect(props: RadioGroupProps & { items: Array<KeyLabel> }) {
  const { items, ...otherProps } = props;

  return (
    <RadioGroup className="text-xl" classNames={{ label: "text-gray-400" }} orientation="horizontal" {...otherProps}>
      {items.map((item) => (
        <Radio key={item.key} value={item.key}>
          {item.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
