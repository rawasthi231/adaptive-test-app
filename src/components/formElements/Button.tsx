import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  loading?: boolean;
}

const Button = ({ type, children, ...rest }: Props) => (
  <button type={type} {...rest}>
    {children}
  </button>
);

export default Button;
