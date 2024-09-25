import { Input } from "@nextui-org/input";

export function PrimaryInput(props) {
  return (
    <Input
      classNames={{
        label: "text-black",
        input: "text-black placeholder:text-gray-400",
        inputWrapper: "group-data-[readonly=true]:bg-gray-100"
      }}
      color="primary"
      labelPlacement="outside"
      {...props}
    />
  );
}

export function SecondaryInput(props) {
  return (
    <PrimaryInput
      classNames={{
        label: "text-gray-400 text-xl",
        input:
          "text-black placeholder:text-gray-300 placeholder:text-base text-xl focus-visible:bg-transparent focus-visible:border-b group-data-[hover=true]:border-b",
        inputWrapper: [
          "shadow-none bg-transparent p-0 group-data-[focus=true]:bg-transparent group-data-[hover=true]:bg-transparent",
        ],
      }}
      placeholder={`Enter ${props.label}`}
      {...props}
    />
  );
}
