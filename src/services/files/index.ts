"use server";

export type UploadResponse = {
  status: number;
  fileName: string;
};

const address = process.env.FILE_SERVER_ADDRESS
const browserAddress = process.env.FILE_SERVER_BROWSER_ADDRESS
const user = process.env.FILE_SERVER_USER
const password = process.env.FILE_SERVER_PASSWORD

export async function uploadFileToServer(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(user + ":" + password));

  const response = await fetch(
    `${address}/files`,
    {
      method: "POST",
      body: formData,
      headers: headers,
    },
  )
    .then((res) => res.json())
    .then((data) => data as UploadResponse);

  return `${browserAddress}/${response.fileName}`;
}

export async function deleteFileByURL(url: string) {
  console.debug("deleteFileByURL", url);

  if (
    !url ||
    !address ||
    !url.startsWith(address)
  ) {
    return;
  }

  const filename = url.split("/").pop();
  const targetURL = `${address}/files/${filename}`;

  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(user + ":" + password));

  await fetch(
    targetURL,
    {
      method: "DELETE",
      headers: headers,
    },
  )
}
