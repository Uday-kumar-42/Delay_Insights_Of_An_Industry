import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface LinkElementProps {
  text: string;
  link: string;
  icon: ReactElement;
  variant: "primary" | "secondary";
}

const textVariants = {
  primary: "text-black",
  secondary: "text-neutral-",
};

const activeBg = {
  primary: "bg-neutral-300",
  secondary: "bg-white/20",
};

const hoverBg = {
  primary: "hover:bg-neutral-200",
  secondary: "hover:bg-white/10",
};

export const LinkElement = ({
  text,
  link,
  icon,
  variant,
}: LinkElementProps) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `
        flex items-center gap-4 px-5 hover:px-8 py-4 rounded-sm transition-all duration-200 
        ${textVariants[variant]} 
        ${isActive ? activeBg[variant] : hoverBg[variant]}
        `
      }
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </NavLink>
  );
};
