import { HTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TextareaProps<T extends FieldValues> extends HTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>;
  control: Control<T>;
}

export default function Textarea<T extends FieldValues>({ control, name, ...props }: TextareaProps<T>) {
  return (
    <Controller
      control={control}
      render={({ field }) => <textarea {...props} value={field.value} onChange={field.onChange} />}
      name={name}
      defaultValue={"" as T[typeof name]}
    />
  );
}
