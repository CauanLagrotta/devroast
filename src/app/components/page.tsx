import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	CodeBlock,
	CodeBody,
	CodeDot,
	CodeFileName,
	CodeHeader,
	CodeLineNumbers,
} from "@/components/ui/code-block";
import { CodeHighlight } from "@/components/ui/code-highlight";
import { DiffLine } from "@/components/ui/diff-line";
import { ScoreRing } from "@/components/ui/score-ring";
import { Toggle } from "@/components/ui/toggle";

const buttonVariantsList = [
	"primary",
	"secondary",
	"link",
	"ghost",
	"destructive",
] as const;
const buttonSizes = ["sm", "md", "lg"] as const;
const badgeVariants = [
	"critical",
	"warning",
	"good",
	"needs_serious_help",
] as const;

const sampleCode = `function calculateTotal(items: number[]): number {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i];
  }
  return total;
}`;

export default function ComponentsPage() {
	return (
		<main className="min-h-screen bg-bg-page text-white p-8">
			<h1 className="font-mono text-3xl font-bold mb-12">Components Gallery</h1>

			<section className="mb-16">
				<h2 className="font-mono text-xl font-semibold mb-6 text-white">
					{"// buttons"}
				</h2>

				<div className="space-y-8">
					<div>
						<h3 className="font-mono text-sm text-text-secondary mb-3">
							Variants
						</h3>
						<div className="flex flex-wrap gap-4">
							{buttonVariantsList.map((variant) => (
								<Button key={variant} variant={variant}>
									{variant}
								</Button>
							))}
						</div>
					</div>

					<div>
						<h3 className="font-mono text-sm text-text-secondary mb-3">
							Sizes
						</h3>
						<div className="flex flex-wrap items-center gap-4">
							{buttonSizes.map((size) => (
								<Button key={size} size={size}>
									size {size}
								</Button>
							))}
						</div>
					</div>

					<div>
						<h3 className="font-mono text-sm text-text-secondary mb-3">
							States
						</h3>
						<div className="flex flex-wrap gap-4">
							<Button>Default</Button>
							<Button disabled>Disabled</Button>
							<Button className="w-32">Custom width</Button>
						</div>
					</div>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="font-mono text-xl font-semibold mb-6 text-white">
					{"// toggle"}
				</h2>

				<div className="flex items-center gap-8">
					<div className="flex items-center gap-3">
						<Toggle checked />
						<span className="font-mono text-sm text-accent-green">
							roast mode
						</span>
					</div>
					<div className="flex items-center gap-3">
						<Toggle />
						<span className="font-mono text-sm text-text-secondary">
							roast mode
						</span>
					</div>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="font-mono text-xl font-semibold mb-6 text-white">
					{"// badge_status"}
				</h2>

				<div className="flex flex-wrap gap-6">
					{badgeVariants.map((variant) => (
						<Badge key={variant} variant={variant}>
							{variant.replace("_", " ")}
						</Badge>
					))}
				</div>
			</section>

			<section className="mb-16">
				<h2 className="font-mono text-xl font-semibold mb-6 text-white">
					{"// cards"}
				</h2>

				<Card className="max-w-lg">
					<CardHeader>
						<Badge variant="critical" />
						<CardTitle>using var instead of const/let</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription>
							The var keyword is function-scoped rather than block-scoped, which
							can lead to unexpected behavior and bugs. Modern JavaScript uses
							const for immutable bindings and let for mutable ones.
						</CardDescription>
					</CardContent>
				</Card>
			</section>

			<section className="mb-16">
				<h2 className="font-mono text-xl font-semibold mb-6 text-white">
					{"// code_block"}
				</h2>

				<CodeBlock className="max-w-2xl">
					<CodeHeader>
						<CodeDot color="red" />
						<CodeDot color="amber" />
						<CodeDot color="green" />
						<CodeFileName>calculate.js</CodeFileName>
					</CodeHeader>
					<CodeBody>
						<CodeLineNumbers>
							1<br />2<br />3<br />4<br />5<br />6
						</CodeLineNumbers>
						<CodeHighlight code={sampleCode} language="typescript" />
					</CodeBody>
				</CodeBlock>
			</section>

			<section className="mb-16">
				<h2 className="font-mono text-xl font-semibold mb-6 text-white">
					{"// diff_line"}
				</h2>

				<div className="max-w-2xl border border-border-primary bg-bg-input">
					<DiffLine type="removed">var total = 0;</DiffLine>
					<DiffLine type="added">const total = 0;</DiffLine>
					<DiffLine type="context">
						for (let i = 0; i &lt; items.length; i++) {"{"}
					</DiffLine>
					<DiffLine type="context"> total += items[i];</DiffLine>
					<DiffLine type="context">{"}"}</DiffLine>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="font-mono text-xl font-semibold mb-6 text-white">
					{"// score_ring"}
				</h2>

				<div className="flex flex-wrap items-center gap-8">
					<div className="flex flex-col items-center gap-2">
						<ScoreRing score={3.5} />
						<span className="font-mono text-sm text-text-secondary">score 3.5</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ScoreRing score={7.5} />
						<span className="font-mono text-sm text-text-secondary">score 7.5</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ScoreRing score={9.2} />
						<span className="font-mono text-sm text-text-secondary">score 9.2</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ScoreRing score={2.0} maxScore={5} />
						<span className="font-mono text-sm text-text-secondary">score 2.0/5</span>
					</div>
				</div>
			</section>
		</main>
	);
}
