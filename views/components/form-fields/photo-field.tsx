import React from "react";
import { FileUploadField, FileUploadFieldProps } from "./file-upload-field";

type Props = Omit<FileUploadFieldProps, "accept" | "children">;

export const PhotoField = (props: Props) => {
  return (
    <FileUploadField {...props} accept="image/*">
      {(baseUrl) => {
        return (
          <div>
            <img src={baseUrl} style={{ width: "100%" }} />
          </div>
        );
      }}
    </FileUploadField>
  );
};
