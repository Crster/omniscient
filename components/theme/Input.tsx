import { DatePicker, DatePickerProps } from "@nextui-org/date-picker";
import { Input, InputProps } from "@nextui-org/input";

export function PrimaryInput(props: InputProps) {
  return (
    <Input
      classNames={{
        label: "text-black",
        input: "text-black placeholder:text-gray-400",
        inputWrapper: "group-data-[readonly=true]:bg-gray-100",
      }}
      color="primary"
      labelPlacement="outside"
      {...props}
    />
  );
}

export function SecondaryInput(props: InputProps) {
  return (
    <PrimaryInput
      classNames={{
        label: "!text-gray-400 text-xl",
        input: "text-black placeholder:text-gray-300 placeholder:text-base focus-visible:bg-transparent",
        inputWrapper: [
          "shadow-none bg-transparent p-0 group-data-[focus=true]:bg-transparent group-data-[hover=true]:bg-transparent",
        ],
      }}
      placeholder={`Enter ${props.label}`}
      variant="underlined"
      {...props}
    />
  );
}

export function DateInput(props: DatePickerProps) {
  return (
    <DatePicker
      showMonthAndYearPickers
      dateInputClassNames={{
        label: "text-xl text-gray-400",
        input: "text-xl text-black",
      }}
      {...props}
    />
  );
}

export function SecondaryDateInput(props: DatePickerProps) {
  return <DateInput variant="underlined" {...props} />;
}
