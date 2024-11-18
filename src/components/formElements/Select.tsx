import { Option } from "@/typings";
import { HTMLAttributes } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface SelectProps<T extends FieldValues>
  extends HTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  control: Control<T>;
  options: Array<Option>;
}

export default function Select<T extends FieldValues>({
  options,
  name,
  control,
  ...props
}: SelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select {...props} value={field.value} onChange={field.onChange}>
          <option value="" selected>
            -- Select --
          </option>
          {options.map((data) => (
            <option key={data.value} value={data.value}>
              {data.label}
            </option>
          ))}
        </select>
      )}
    />
  );
}
