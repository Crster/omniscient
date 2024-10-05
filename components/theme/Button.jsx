import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Link } from "@nextui-org/link";

export function PrimaryButton({ children, ...props }) {
  return (
    <Button color="primary" radius="sm" {...props}>
      {children}
    </Button>
  );
}

export function DangerButton({ children, ...props }) {
  return (
    <Button
      color="danger"
      radius="sm"
      {...props}
    >
      {children}
    </Button>
  );
}

export function SecondaryButton({ children, ...props }) {
  return (
    <Button
      color="default"
      radius="sm"
      {...props}
    >
      {children}
    </Button>
  );
}

export function LinkButton({ children, href, ...props }) {
  return (
    <Button as={Link} href={href} color="primary" radius="sm" {...props}>
      {children}
    </Button>
  );
}

export function IconButton({ label, icon, children, ...props }) {
  return (
    <Tooltip content={label}>
      <Button
        isIconOnly
        aria-label={label}
        color="primary"
        radius="sm"
        {...props}
      >
        {icon ?? children}
      </Button>
    </Tooltip>
  );
}
