import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const badgeVariants = tv({
	base: "inline-flex items-center gap-2 font-mono text-xs font-normal",
	variants: {
		variant: {
			critical: "text-accent-red",
			warning: "text-accent-amber",
			good: "text-accent-green",
			needs_serious_help: "text-accent-red",
		},
	},
	defaultVariants: {
		variant: "good",
	},
});

const dotVariants = tv({
	base: "shrink-0 rounded-full",
	variants: {
		variant: {
			critical: "bg-accent-red w-2 h-2",
			warning: "bg-accent-amber w-2 h-2",
			good: "bg-accent-green w-2 h-2",
			needs_serious_help: "bg-accent-red w-2 h-2",
		},
	},
	defaultVariants: {
		variant: "good",
	},
});

type BadgeVariantProps = {
	variant?: "critical" | "warning" | "good" | "needs_serious_help";
};

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
	variant?: BadgeVariantProps["variant"];
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ className, variant = "good", children, ...props }, ref) => {
		return (
			<div
				className={badgeVariants({ variant, className })}
				ref={ref}
				{...props}
			>
				<span className={dotVariants({ variant })} />
				{children}
			</div>
		);
	},
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
