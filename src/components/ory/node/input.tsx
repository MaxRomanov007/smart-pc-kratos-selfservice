"use client";

import { Input } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/chakra/password-input";
import { getNodeLabel } from "@ory/client-fetch";
import type { OryNodeInputProps } from "@ory/elements-react";
import { useFormContext } from "react-hook-form";
import OryPictureInput from "@/components/ory/node/picture-input";

export default function OryInput({
  node,
  attributes: uiAttributes,
  onClick,
}: OryNodeInputProps) {
  const label = getNodeLabel(node);
  const { register } = useFormContext();

  const {autocomplete, value, ...attributes} = uiAttributes;

  console.log(register(attributes.name, { value }))

  if (uiAttributes.name.endsWith("picture")) {
    return <OryPictureInput src={value} {...attributes} {...register(attributes.name, { value })}/>;
  }

  if (attributes.type === "password") {
    return (
      <PasswordInput
        {...attributes}
        onClick={onClick}
        autoComplete={autocomplete}
        placeholder={label?.text}
        data-testid={"ory/form/node/input/" + attributes.name}
        {...register(attributes.name, { value })}
      />
    );
  }

  return (
    <Input
      {...attributes}
      onClick={onClick}
      autoComplete={autocomplete}
      placeholder={label?.text}
      data-testid={"ory/form/node/input/" + attributes.name}
      {...register(attributes.name, { value })}
    />
  );
}