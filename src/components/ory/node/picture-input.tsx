import {
  Button,
  FileUpload,
  Image as ChakraImage,
  Skeleton,
  Stack,
  Text,
  useSafeLayoutEffect,
} from "@chakra-ui/react";
import { useState } from "react";
import type { OryNodeInputProps } from "@ory/elements-react";
import { useFormContext } from "react-hook-form";
import { deleteFileByURL, uploadFileToServer } from "@/services/files";
import { useTranslations } from "next-intl";

export default function OryPictureInput({
  attributes: uiAttributes,
  onClick,
}: OryNodeInputProps) {
  const { value, ...attributes } = uiAttributes;
  const [preview, setPreview] = useState<string>(value ?? "");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setValue, formState } = useFormContext();
  const t = useTranslations("components")

  useSafeLayoutEffect(() => {
    return () => {
      if (preview !== value && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, value]);

  useSafeLayoutEffect(() => {
    setValue(attributes.name, value);
  }, []);

  useSafeLayoutEffect(() => {
    if (formState.isSubmitting && preview !== value) {
      deleteFileByURL(value);
    }
  }, [formState.isSubmitting]);

  const onFileAccept = (file: File | undefined) => {
    if (!file) return;

    if (preview !== value) {
      deleteFileByURL(preview);
    }
    setIsLoading(true);
    uploadFileToServer(file).then((res) => {
      setValue(attributes.name, res);
      setPreview(res);
    });
  };

  return (
    <Stack w="full">
      <FileUpload.Root
        accept={["image/png", "image/jpeg", "image/webp", "image/avif"]}
        {...attributes}
        onClick={onClick}
        maxFileSize={3145728}
        onFileAccept={(f) => onFileAccept(f.files[0])}
      >
        <FileUpload.HiddenInput />

        <Skeleton loading={isLoading} w={"full"}>
          <FileUpload.Trigger asChild>
            <Button variant="ghost" size="sm" p={0} w="full" h={"auto"} py={4}>
              <ChakraImage
                rounded="full"
                w={[24, 48]}
                aspectRatio={1}
                alt={"Users avatar picture file upload"}
                onLoad={() => setIsLoading(false)}
                src={
                  preview.length > 0
                    ? preview
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
              />
            </Button>
          </FileUpload.Trigger>
        </Skeleton>
      </FileUpload.Root>

      <Text textStyle="sm">{t("ory.picture-input.help-text")}</Text>
    </Stack>
  );
}
