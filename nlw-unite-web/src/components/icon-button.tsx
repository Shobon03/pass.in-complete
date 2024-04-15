import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type IconButtonProps = ComponentProps<"button"> & {
  transparent?: boolean;
};

export function IconButton({ transparent, ...props }: IconButtonProps) {
  return (
    <button
      className={twMerge(
        "rounded-md border border-white/10  p-1.5",
        transparent ? "bg-black/20" : "bg-white/10",
        props.disabled ? "opacity-50" : "",
      )}
      {...props}
    />
  );
}
