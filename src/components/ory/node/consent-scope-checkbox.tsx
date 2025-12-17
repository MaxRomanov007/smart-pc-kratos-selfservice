import { Button, Checkbox } from "@chakra-ui/react";
import {
  type OryNodeConsentScopeCheckboxProps,
  useOryFlow,
} from "@ory/elements-react";

export default function OryConsentScopeCheckbox({attributes, node, onCheckedChange}: OryNodeConsentScopeCheckboxProps) {
  const flow = useOryFlow();

  console.debug("OryConsentScopeCheckbox", flow);

  return (
    <>
      <Checkbox.Root
        onCheckedChange={(e) => onCheckedChange(!!e.checked)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
      </Checkbox.Root>
      <Button type="submit">Helll</Button>
    </>
  );
};