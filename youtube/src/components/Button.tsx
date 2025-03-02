import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

// Define button styles with variants and sizes
export const buttonStyles = cva("transition", {
    variants: {
        variant: {
            default: ["bg-[var(--secondary-default)]" , "hover:[var(--secondary-dark-hover)]", "cursor-pointer"],
            ghost: ["hover:bg-gray-100", "cursor-pointer"],
            dark: [
                "bg-[var(--secondary-dark)]",
                "hover:[var(--secondary-dark-hover)]",
                "text-[var(--secondary-text)]",
                "cursor-pointer"]
        },
        size: {
            default: "rounded p-2",
            icon: "rounded-full w-10 h-10 flex items-center justify-center p-2.5",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export const Button: React.FC<ButtonProps> = ({ variant, size, className, ...props }) => {
    return (
        <button
            {...props} 
            className={twMerge(buttonStyles({ variant, size }), className)} 
        />
    );
};
