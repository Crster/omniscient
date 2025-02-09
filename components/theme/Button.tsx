import { Button, ButtonProps } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Link } from "@heroui/link";

export function PrimaryButton(props: ButtonProps) {
  return <Button color="primary" radius="sm" {...props} />;
}

export function DangerButton(props: ButtonProps) {
  return <Button color="danger" radius="sm" {...props} />;
}

export function SecondaryButton(props: ButtonProps) {
  return <Button color="default" radius="sm" {...props} />;
}

export function LinkButton(props: ButtonProps) {
  return <Button as={Link} color="primary" radius="sm" {...props} />;
}

export function IconButton(props: ButtonProps & { label: string; icon: React.ReactNode }) {
  const { icon, children, ...otherProps } = props;

  return (
    <Tooltip content={props.label}>
      <Button isIconOnly aria-label={props.label} color="primary" radius="sm" {...otherProps}>
        {icon ?? children}
      </Button>
    </Tooltip>
  );
}
