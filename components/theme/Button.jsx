import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export function PrimaryButton({
  children,
  className,
  outline,
  type,
  fullWidth,
  startContent,
  onPress,
}) {
  return (
    <Button
      color="primary"
      radius="sm"
      variant={outline ? "ghost" : "solid"}
      className={className}
      type={type}
      fullWidth={fullWidth}
      onPress={onPress}
      startContent={startContent}
    >
      {children}
    </Button>
  );
}

export function DangerButton({
  children,
  className,
  outline,
  type,
  fullWidth,
  startContent,
  onPress,
}) {
  return (
    <Button
      color="danger"
      radius="sm"
      variant={outline ? "ghost" : "solid"}
      className={className}
      type={type}
      fullWidth={fullWidth}
      onPress={onPress}
      startContent={startContent}
    >
      {children}
    </Button>
  );
}

export function SecondaryButton({
  children,
  className,
  outline,
  type,
  fullWidth,
  startContent,
  onPress,
}) {
  return (
    <Button
      color="default"
      variant={outline ? "ghost" : "solid"}
      radius="sm"
      className={className}
      type={type}
      fullWidth={fullWidth}
      onPress={onPress}
      startContent={startContent}
    >
      {children}
    </Button>
  );
}

export function LinkButton({
  children,
  href,
  className,
  type,
  fullWidth,
  onPress,
}) {
  return (
    <Button
      as={Link}
      href={href}
      color="primary"
      radius="sm"
      className={className}
      type={type}
      fullWidth={fullWidth}
      onPress={onPress}
    >
      {children}
    </Button>
  );
}
