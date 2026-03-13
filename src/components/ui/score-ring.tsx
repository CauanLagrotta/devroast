import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const scoreRingVariants = tv({
	base: "relative inline-flex items-center justify-center",
	variants: {
		size: {
			sm: "h-16 w-16",
			md: "h-24 w-24",
			lg: "h-32 w-32",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const svgVariants = tv({
	base: "absolute inset-0 -rotate-90",
	variants: {
		size: {
			sm: "[stroke-width:4px]",
			md: "[stroke-width:4px]",
			lg: "[stroke-width:6px]",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const centerVariants = tv({
	base: "absolute inset-0 flex flex-col items-center justify-center leading-none",
	variants: {
		size: {
			sm: "gap-0",
			md: "gap-0",
			lg: "gap-0.5",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const scoreVariants = tv({
	base: "font-mono font-bold",
	variants: {
		size: {
			sm: "text-sm",
			md: "text-xl",
			lg: "text-3xl",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const maxScoreVariants = tv({
	base: "font-mono text-text-tertiary",
	variants: {
		size: {
			sm: "text-[8px]",
			md: "text-[10px]",
			lg: "text-xs",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

type ScoreRingVariantProps = {
	size?: "sm" | "md" | "lg";
};

export interface ScoreRingProps
	extends HTMLAttributes<HTMLDivElement> {
	score: number;
	maxScore?: number;
	size?: ScoreRingVariantProps["size"];
}

function getStrokeColor(score: number, maxScore: number): string {
	const percentage = score / maxScore;

	if (percentage >= 0.7) return "var(--color-accent-green)";
	if (percentage >= 0.4) return "var(--color-accent-amber)";
	return "var(--color-accent-red)";
}

const ScoreRing = forwardRef<HTMLDivElement, ScoreRingProps>(
	(
		{ className, score, maxScore = 10, size = "md", ...props },
		ref,
	) => {
		const radius = 35;
		const circumference = 2 * Math.PI * radius;
		const offset = circumference - (score / maxScore) * circumference;
		const strokeColor = getStrokeColor(score, maxScore);

		return (
			<div
				className={scoreRingVariants({ size, className })}
				ref={ref}
				{...props}
			>
				{/* Background ring */}
				<svg
					className={svgVariants({ size })}
					viewBox="0 0 80 80"
				>
					<circle
						cx="40"
						cy="40"
						r={radius}
						fill="none"
						stroke="var(--color-border-primary)"
						strokeLinecap="round"
					/>
				</svg>

				{/* Score ring */}
				<svg
					className={svgVariants({ size })}
					viewBox="0 0 80 80"
				>
					<circle
						cx="40"
						cy="40"
						r={radius}
						fill="none"
						stroke={strokeColor}
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						style={{
							transition: "stroke-dashoffset 0.5s ease-out",
						}}
					/>
				</svg>

				{/* Center content */}
				<div className={centerVariants({ size })}>
					<span className={scoreVariants({ size })}>{score.toFixed(1)}</span>
					<span className={maxScoreVariants({ size })}>/{maxScore}</span>
				</div>
			</div>
		);
	},
);

ScoreRing.displayName = "ScoreRing";

export { ScoreRing };
