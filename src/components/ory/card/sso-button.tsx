import type { OryNodeSsoButtonProps } from "@ory/elements-react";
import { FaGoogle, FaYandex } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { type ReactNode } from "react";
import { getNodeLabel } from "@ory/client-fetch";
import { Tooltip } from "@/components/ui/chakra/tooltip";
import { useFormContext } from "react-hook-form";

interface Props extends OryNodeSsoButtonProps {
  variant?: "ghost" | "delete";
}

export default function OrySsoButton({
  node,
  attributes,
  onClick,
  variant = "ghost",
}: Props) {
  const label = getNodeLabel(node);
  const { type, name, value, ...rest } = attributes;
  const {
    formState: { isSubmitting, isReady },
  } = useFormContext();

  return (
    <Tooltip content={label?.text ?? "Sign in with sso provider"}>
      <IconButton
        loading={isSubmitting}
        variant="ghost"
        type={type === "button" ? "button" : "submit"}
        value={value}
        name={name}
        onClick={onClick}
        colorPalette={variant === "delete" ? "red" : undefined}
        size="sm"
        disabled={!isReady && (rest.disabled ?? isSubmitting)}
        data-loading={isSubmitting}
      >
        {icons[attributes.value]}
      </IconButton>
    </Tooltip>
  );
}

type IconItem = Record<string, ReactNode>;
const icons: IconItem = {
  yandex: <FaYandex />,
  google: <FaGoogle />,
};
