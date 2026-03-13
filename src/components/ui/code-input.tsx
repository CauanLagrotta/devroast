"use client";

import { forwardRef, type TextareaHTMLAttributes, useRef, useEffect } from "react";
import { tv } from "tailwind-variants";

const codeInputVariants = tv({
	base: "w-full min-h-[200px] resize-none bg-bg-input font-mono text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none p-3 leading-relaxed",
	variants: {
		variant: {
			default: "",
			compact: "min-h-[100px] text-xs p-2",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface CodeInputProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	variant?: "default" | "compact";
	onCodeChange?: (code: string) => void;
}

const CodeInput = forwardRef<HTMLTextAreaElement, CodeInputProps>(
	({ className, variant = "default", onCodeChange, ...props }, ref) => {
		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			onCodeChange?.(e.target.value);
		};

		return (
			<textarea
				ref={ref}
				className={codeInputVariants({ variant, className })}
				onChange={handleChange}
				spellCheck={false}
				{...props}
			/>
		);
	},
);

CodeInput.displayName = "CodeInput";

export { CodeInput, codeInputVariants };
