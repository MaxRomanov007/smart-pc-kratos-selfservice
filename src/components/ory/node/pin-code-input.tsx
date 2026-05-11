"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { OryNodeInputProps } from "@ory/elements-react";
import { PinInput } from "@chakra-ui/react";

export default function OryPinCodeInput({ attributes }: OryNodeInputProps) {
  const { setValue } = useFormContext();
  const { maxlength, name } = attributes;
  const elements = maxlength ?? 6;

  const [pinValue, setPinValue] = useState<string[]>(Array(elements).fill(""));

  const handleInputChange = ({ value }: { value: string[] }) => {
    setPinValue(value);
    setValue(name, value.join(""), { shouldValidate: true });
  };

  return (
    <PinInput.Root
      onValueChange={handleInputChange}
      name={name}
      value={pinValue}
      attached
    >
      <PinInput.HiddenInput />
      <PinInput.Control>
        {Array.from({ length: elements }).map((_, i) => (
          <PinInput.Input index={i} key={i} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
