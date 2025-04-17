import { twMerge } from "tailwind-merge";
import { ReactComponent } from "@/types/ReactComponent";

interface MaterialIconProps {
  icon: string;
  className?: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
}

export const MaterialIcon: ReactComponent<MaterialIconProps> = (props) => (
  <span className={twMerge("material-symbols-outlined", props.color && `text-${props.color}`, props.className)}>
    {props.icon}
  </span>
);
