import { HTMLAttributes, ReactNode } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

/**
 * Wrapper component for input fields
 * @param {string} className - Class name for the input field
 * @returns {JSX.Element} - Wrapper component
 */
export const RadioWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element => <div className={className}>{children}</div>;

/**
 * Label component for input fields
 * @param {string} children - Label text
 * @returns {JSX.Element} - Label component
 */

RadioWrapper.Label = function ({
  children,
  htmlFor,
  className,
}: {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}): JSX.Element {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};

interface RadioProps<T extends FieldValues>
  extends Omit<HTMLAttributes<HTMLInputElement>, "type"> {
  name: Path<T>;
  control: Control<T>;
  value: string;
}

export default function RadioButton<T extends FieldValues>({
  name,
  control,
  value,
  ...props
}: RadioProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          type="radio"
          name={name}
          {...props}
          value={field.value}
          onChange={() => field.onChange(value)}
          checked={field.value === value}
        />
      )}
      // defaultValue={value as T[typeof name]}
    />
  );
}
