import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const codeBlockVariants = tv({
	base: "w-full overflow-hidden rounded-none border border-border-primary bg-bg-input font-mono",
});

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {}

const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
	({ className, ...props }, ref) => {
		return (
			<div className={codeBlockVariants({ className })} ref={ref} {...props} />
		);
	},
);

CodeBlock.displayName = "CodeBlock";

const codeHeaderVariants = tv({
	base: "flex h-10 items-center gap-3 border-b border-border-primary px-4",
});

export interface CodeHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CodeHeader = forwardRef<HTMLDivElement, CodeHeaderProps>(
	({ className, ...props }, ref) => {
		return (
			<div className={codeHeaderVariants({ className })} ref={ref} {...props} />
		);
	},
);

CodeHeader.displayName = "CodeHeader";

const codeDotVariants = tv({
	base: "h-2.5 w-2.5 rounded-full",
	variants: {
		color: {
			red: "bg-accent-red",
			amber: "bg-accent-amber",
			green: "bg-accent-green",
		},
	},
});

interface CodeDotProps extends HTMLAttributes<HTMLDivElement> {
	color: "red" | "amber" | "green";
}

const CodeDot = forwardRef<HTMLDivElement, CodeDotProps>(
	({ className, color, ...props }, ref) => {
		return (
			<span
				className={codeDotVariants({ color, className })}
				ref={ref}
				{...props}
			/>
		);
	},
);

CodeDot.displayName = "CodeDot";

const codeFileNameVariants = tv({
	base: "ml-auto text-xs text-text-tertiary",
});

export interface CodeFileNameProps extends HTMLAttributes<HTMLSpanElement> {}

const CodeFileName = forwardRef<HTMLSpanElement, CodeFileNameProps>(
	({ className, ...props }, ref) => {
		return (
			<span
				className={codeFileNameVariants({ className })}
				ref={ref}
				{...props}
			/>
		);
	},
);

CodeFileName.displayName = "CodeFileName";

const codeBodyVariants = tv({
	base: "flex min-h-[100px] w-full",
});

export interface CodeBodyProps extends HTMLAttributes<HTMLDivElement> {}

const CodeBody = forwardRef<HTMLDivElement, CodeBodyProps>(
	({ className, ...props }, ref) => {
		return (
			<div className={codeBodyVariants({ className })} ref={ref} {...props} />
		);
	},
);

CodeBody.displayName = "CodeBody";

const codeLineNumbersVariants = tv({
	base: "flex flex-col items-end pr-3 pl-2.5 py-3 border-r border-border-primary text-xs text-text-tertiary gap-1.5 select-none",
});

export interface CodeLineNumbersProps extends HTMLAttributes<HTMLDivElement> {}

const CodeLineNumbers = forwardRef<HTMLDivElement, CodeLineNumbersProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				className={codeLineNumbersVariants({ className })}
				ref={ref}
				{...props}
			>
				{children}
			</div>
		);
	},
);

CodeLineNumbers.displayName = "CodeLineNumbers";

const codeContentVariants = tv({
	base: "flex flex-col py-3 px-3 text-sm text-text-secondary gap-1.5",
});

export interface CodeContentProps extends HTMLAttributes<HTMLDivElement> {}

const CodeContent = forwardRef<HTMLDivElement, CodeContentProps>(
	({ className, ...props }, ref) => {
		return (
			<div
				className={codeContentVariants({ className })}
				ref={ref}
				{...props}
			/>
		);
	},
);

CodeContent.displayName = "CodeContent";

export {
	CodeBlock,
	CodeHeader,
	CodeDot,
	CodeFileName,
	CodeBody,
	CodeLineNumbers,
	CodeContent,
};

export function getHighlighter() {
	return import("shiki").then((shiki) =>
		shiki.createHighlighter({
			themes: ["vesper"],
			langs: ["javascript", "typescript", "jsx", "tsx", "json", "html", "css"],
		}),
	);
}
