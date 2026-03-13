import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv } from "tailwind-variants";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center font-mono text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary: "bg-accent-green text-black hover:bg-accent-green/90",
			secondary:
				"border border-border-primary bg-transparent text-text-primary hover:bg-bg-elevated hover:text-white",
			link: "border-b border-transparent bg-transparent text-text-secondary hover:border-border-primary hover:text-text-primary underline-offset-4",
			ghost: "bg-transparent text-text-primary hover:bg-bg-elevated",
			destructive: "bg-accent-red text-white hover:bg-accent-red/90",
		},
		size: {
			sm: "px-4 py-1.5 text-xs",
			md: "px-6 py-2.5 text-sm",
			lg: "px-8 py-3 text-base",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

type ButtonVariantProps = {
	variant?: "primary" | "secondary" | "link" | "ghost" | "destructive";
	size?: "sm" | "md" | "lg";
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariantProps["variant"];
	size?: ButtonVariantProps["size"];
	className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={buttonVariants({ variant, size, className })}
				ref={ref}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonVariants };
