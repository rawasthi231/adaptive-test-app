import React, { InputHTMLAttributes } from "react";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TextboxProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
}

export default function Textbox<T extends FieldValues>({
  control,
  name,
  ...props
}: TextboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input {...props} value={field.value} onChange={field.onChange} />
      )}
      defaultValue={"" as T[typeof name]}
    />
  );
}
