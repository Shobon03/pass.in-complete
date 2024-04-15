import { ComponentProps, ReactNode } from "react";

type NavLinkProps = ComponentProps<"a"> & {
  children: ReactNode;
};

export function NavLink({ children, ...props }: NavLinkProps) {
  return <a {...props}>{children}</a>;
}
