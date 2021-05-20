import React from "react";
import { FileUploadField, FileUploadFieldProps } from "./file-upload-field";

type Props = Omit<FileUploadFieldProps, "accept" | "children">;

export const VideoField = (props: Props) => {
  return <FileUploadField {...props} accept="video/*" />;
};
