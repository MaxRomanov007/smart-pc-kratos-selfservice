"use client";

import { useFormContext } from "react-hook-form";
import type { OryNodeInputProps } from "@ory/elements-react";
import { PinInput } from "@chakra-ui/react";

export default function OryPinCodeInput({ attributes }: OryNodeInputProps) {
  const { setValue, watch } = useFormContext();
  const { maxlength, name } = attributes;
  const elements = maxlength ?? 6;

  const rawValue = watch(name); // Это может быть string, string[], или undefined

  // Преобразуем строку в массив символов, если нужно
  const value = typeof rawValue === "string"
    ? rawValue.split("")
    : Array.isArray(rawValue)
      ? rawValue
      : [];

  const handleInputChange = ({ value }: { value: string[] }) => {
    setValue(name, value.join("")); // Сохраняем как строку — как ожидает Kratos
  };

  return (
    <PinInput.Root
      onValueChange={handleInputChange}
      name={name}
      value={value}
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