import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const diffLineVariants = tv({
	base: "flex w-full gap-2 px-4 py-2 font-mono text-sm",
	variants: {
		type: {
			removed: "bg-red-950/50 text-accent-red",
			added: "bg-green-950/50 text-text-primary",
			context: "bg-transparent text-text-secondary",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

const prefixVariants = tv({
	base: "w-4 shrink-0",
	variants: {
		type: {
			removed: "text-accent-red",
			added: "text-accent-green",
			context: "text-text-tertiary",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

type DiffLineVariantProps = {
	type?: "removed" | "added" | "context";
};

export interface DiffLineProps extends HTMLAttributes<HTMLDivElement> {
	type?: DiffLineVariantProps["type"];
}

const DiffLine = forwardRef<HTMLDivElement, DiffLineProps>(
	({ className, type = "context", children, ...props }, ref) => {
		return (
			<div
				className={diffLineVariants({ type, className })}
				ref={ref}
				{...props}
			>
				<span className={prefixVariants({ type })}>
					{type === "removed" ? "-" : type === "added" ? "+" : " "}
				</span>
				<span className="flex-1">{children}</span>
			</div>
		);
	},
);

DiffLine.displayName = "DiffLine";

export { DiffLine, diffLineVariants };
