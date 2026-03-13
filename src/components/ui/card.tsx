import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const cardVariants = tv({
	base: "w-full rounded-none border border-border-primary bg-bg-black p-5",
	variants: {
		variant: {
			default: "border-border-primary",
			elevated: "border-border-primary bg-bg-elevated",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "elevated";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
	({ className, variant = "default", ...props }, ref) => {
		return (
			<div
				className={cardVariants({ variant, className })}
				ref={ref}
				{...props}
			/>
		);
	},
);

Card.displayName = "Card";

const cardHeaderVariants = tv({
	base: "flex items-center gap-2",
});

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, ...props }, ref) => {
		return (
			<div className={cardHeaderVariants({ className })} ref={ref} {...props} />
		);
	},
);

CardHeader.displayName = "CardHeader";

const cardTitleVariants = tv({
	base: "font-mono text-sm text-text-primary",
});

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
	({ className, ...props }, ref) => {
		return (
			<h3 className={cardTitleVariants({ className })} ref={ref} {...props} />
		);
	},
);

CardTitle.displayName = "CardTitle";

const cardDescriptionVariants = tv({
	base: "font-mono text-xs text-text-secondary leading-relaxed",
});

export interface CardDescriptionProps
	extends HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
	({ className, ...props }, ref) => {
		return (
			<p
				className={cardDescriptionVariants({ className })}
				ref={ref}
				{...props}
			/>
		);
	},
);

CardDescription.displayName = "CardDescription";

const cardContentVariants = tv({
	base: "mt-3",
});

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				className={cardContentVariants({ className })}
				ref={ref}
				{...props}
			/>
		);
	},
);

CardContent.displayName = "CardContent";

export {
	Card,
	cardVariants,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
};
