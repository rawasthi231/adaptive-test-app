import { ReactNode } from "react";

/**
 * Wrapper component for input fields
 * @param {string} className - Class name for the input field
 * @returns {JSX.Element} - Wrapper component
 */
const InputWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element => (
  <div className={`form-group ${className ?? ""}`}>{children}</div>
);

/**
 * Label component for input fields
 * @param {string} children - Label text
 * @returns {JSX.Element} - Label component
 */

InputWrapper.Label = function ({
  children,
  htmlFor,
  required,
  className,
  onClick,
}: {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  onClick?: () => void;
}): JSX.Element {
  return (
    <label htmlFor={htmlFor} className={className} onClick={onClick}>
      {children}
      {required ? <sup>*</sup> : null}
    </label>
  );
};

/**
 * Error component for input fields to display error message
 * @param { string } message - Error message
 * @returns { JSX.Element } - Error component
 */

InputWrapper.Error = function ({
  message,
}: {
  message: string;
}): JSX.Element | null {
  return message ? <p className="text-red-500">{message}</p> : null;
};

export default InputWrapper;
