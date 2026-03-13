import * as SwitchPrimitives from "@radix-ui/react-switch";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";

const toggleSizes = {
	sm: { track: "h-4 w-8 p-1", thumb: "h-3 w-3", translate: 16 },
	md: { track: "h-[22px] w-10 p-[3px]", thumb: "h-4 w-4", translate: 18 },
	lg: { track: "h-6 w-12 p-1", thumb: "h-5 w-5", translate: 24 },
};

export interface ToggleProps
	extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
	size?: "sm" | "md" | "lg";
}

const Toggle = forwardRef<
	ElementRef<typeof SwitchPrimitives.Root>,
	ToggleProps
>(({ className, size = "md", checked, ...props }, ref) => {
	const sizes = toggleSizes[size];

	return (
		<SwitchPrimitives.Root
			className={`peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page disabled:cursor-not-allowed disabled:opacity-50 ${sizes.track} ${checked ? "bg-accent-green" : "border-border-primary bg-transparent"} ${className ?? ""}`}
			checked={checked}
			ref={ref}
			{...props}
		>
			<SwitchPrimitives.Thumb
				className={`pointer-events-none block rounded-full bg-black ring-0 ${sizes.thumb}`}
				style={{
					transform: `translateX(${checked ? sizes.translate : 0}px)`,
					transition: "transform 200ms ease-in-out",
				}}
			/>
		</SwitchPrimitives.Root>
	);
});

Toggle.displayName = "Toggle";

export { Toggle };
