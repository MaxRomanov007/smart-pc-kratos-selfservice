import { Button, type ButtonProps } from "@chakra-ui/react";
import { Link } from "@/i18n/navigation";

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export default async function LinkButton({
  href,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
