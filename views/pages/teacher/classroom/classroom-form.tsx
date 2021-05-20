import * as React from "react";
import { PhotoField } from "@fields/photo-field";
import { TextEditor } from "@fields/text-editor-field";
import { FormField } from "@fields/form-field";
import { Button } from "@material-ui/core";

type Props = {
  handler: (e: any) => void;
  submiText?: string;
  loading: boolean;
};

const fields = [
  { name: "title", label: "Title" },
  { name: "category", label: "Category" },
  { name: "caption", label: "Caption" },
  { name: "description", label: "Description", component: TextEditor },
  { name: "photo", label: "Photo", component: PhotoField },
];

export const ClassroomForm = ({
  handler,
  submiText = "Save",
  loading,
}: Props) => {
  const mapper = React.useCallback(
    ({ name, component = FormField, ...rest }: typeof fields[number]) => {
      const Node = component;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <Node disabled={loading} key={name} name={name} {...rest} />;
    },
    []
  );

  return (
    <form onSubmit={handler}>
      {fields.map(mapper)}
      <Button type="submit">{submiText}</Button>
    </form>
  );
};
