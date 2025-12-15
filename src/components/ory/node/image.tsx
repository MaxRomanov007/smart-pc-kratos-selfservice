import type { OryNodeImageProps } from "@ory/elements-react";
import {Image as ChakraImage} from "@chakra-ui/react";
import NextImage from "next/image";
import { getNodeLabel } from "@ory/client-fetch";

export default function OryNodeImage({ attributes, node }: OryNodeImageProps) {
  const label = getNodeLabel(node)

  return (
    <ChakraImage rounded="md" asChild>
      <NextImage {...attributes} alt={label?.text ?? ""}/>
    </ChakraImage>
  );
};