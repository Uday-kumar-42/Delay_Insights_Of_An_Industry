import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md";
  text: string;
  icon?: ReactElement;
}

const variantStyles = {
  primary: "bg-neutral-950 text-white hover:bg-neutral-700 shadow-sm",
  secondary: "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 shadow-md",
};

const sizeVariants = {
  sm: "px-5 py-1 text-sm",
  md: "px-5 py-2 text-md",
};

const defaultStyles = "rounded-lg flex items-center justify-center gap-2 transition-all duration-300";


export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[props.variant]} ${sizeVariants[props.size]} ${defaultStyles}`}
    >
      {props.icon && <span>{props.icon}</span>}
      <span>{props.text}</span>
    </button>
  );
};
