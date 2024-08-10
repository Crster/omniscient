import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export function PrimaryButton({
  children,
  className,
  type,
  fullWidth,
  onPress,
}) {
  return (
    <Button
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

export function SecondaryButton({
  children,
  className,
  type,
  fullWidth,
  onPress,
}) {
  return (
    <Button
      color="default"
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
