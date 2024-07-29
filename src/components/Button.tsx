import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonVariants {
  fill: string;
  outline: string;
  ghost: string;
  icon: string;
  iconFill: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: keyof ButtonVariants;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { children, className, variant = "fill", ...rest } = props;

  const variantClass = {
    fill: "bg-primary text-black hover:bg-opacity-70 rounded-md",
    outline:
      "border-primary border-2 text-primary hover:bg-primary hover:text-black rounded-md",
    ghost: "text-primary hover:bg-black hover:bg-opacity-20 rounded-md",
    icon: "border-2 border-primary rounded-full hover:bg-primary text-primary p-1 hover:text-black",
    iconFill: "bg-primary text-black hover:bg-opacity-70 rounded-full p-1",
  }[variant];

  return (
    <button {...rest} className={`${className} ${variantClass} font-semibold`}>
      {children}
    </button>
  );
};

export default Button;
