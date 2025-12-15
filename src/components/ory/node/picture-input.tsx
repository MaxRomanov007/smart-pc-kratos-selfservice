import {
  Button,
  FileUpload,
  Image as ChakraImage,
  Skeleton,
  useSafeLayoutEffect,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";

export interface OryPictureInputProps extends FileUpload.RootProps {
  src: string;
}

export default function OryPictureInput({
  src,
  ...props
}: OryPictureInputProps) {
  const [preview, setPreview] = useState<string>(src ?? "");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useSafeLayoutEffect(() => {
    return () => {
      if (preview !== src && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, src]);


  const onFileAccept = (file: File | undefined) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <FileUpload.Root
      accept={["image/png", "image/jpeg", "image/webp", "image/avif"]}
      {...props}
      onFileAccept={(f) => onFileAccept(f.files[0])}
    >
      <FileUpload.HiddenInput />

      <Skeleton loading={isLoading} w={"full"}>
        <FileUpload.Trigger asChild>
          <Button variant="ghost" size="sm" p={0} w="full" h={"auto"}>
            <ChakraImage rounded="full" w={[24, 48]} asChild aspectRatio={1}>
              <NextImage
                src={
                  preview.length > 0
                    ? preview
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                width={256}
                height={256}
                onLoad={() => setIsLoading(false)}
                alt={"Users avatar picture file upload"}
              />
            </ChakraImage>
          </Button>
        </FileUpload.Trigger>
      </Skeleton>

    </FileUpload.Root>
  );
}
