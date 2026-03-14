"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { CodeBlock, CodeHeader, CodeDot, CodeBody, CodeLineNumbers } from "@/components/ui/code-block";
import { ScoreRing } from "@/components/ui/score-ring";

const leaderboardData = [
	{ rank: "#1", code: "var total instead of const/let", score: 1.2, language: "javascript" },
	{ rank: "#2", code: "no input validation", score: 2.8, language: "python" },
	{ rank: "#3", code: "eval() for user input", score: 3.1, language: "javascript" },
];

const languages = [
	{ value: "javascript", label: "javascript" },
	{ value: "typescript", label: "typescript" },
	{ value: "python", label: "python" },
	{ value: "rust", label: "rust" },
	{ value: "go", label: "go" },
	{ value: "java", label: "java" },
	{ value: "c++", label: "c++" },
	{ value: "csharp", label: "c#" },
	{ value: "ruby", label: "ruby" },
	{ value: "php", label: "php" },
];

export default function HomeClient() {
	const router = useRouter();
	const [code, setCode] = useState("");
	const [roastMode, setRoastMode] = useState(true);
	const [language, setLanguage] = useState("javascript");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const lineCount = code.split("\n").length;

	const handleSubmit = async () => {
		if (!code.trim()) return;
		
		setIsSubmitting(true);
		
		// Simular envio - em produção isso chamaria uma API
		const params = new URLSearchParams({
			code,
			language,
			roastMode: roastMode.toString(),
		});
		
		router.push(`/results?${params.toString()}`);
	};

	return (
		<div className="min-h-screen bg-bg-page">
			{/* Navbar */}
			<nav className="flex items-center justify-between h-14 px-10 border-b border-border-primary">
				<div className="flex items-center gap-2">
					<span className="text-accent-green font-mono text-xl font-bold">$</span>
					<span className="text-text-primary font-mono text-lg font-medium">
						devroast
					</span>
				</div>
				<Link
					href="/leaderboard"
					className="text-text-secondary font-mono text-sm hover:text-text-primary transition-colors"
				>
					leaderboard
				</Link>
			</nav>

			{/* Main Content */}
			<main className="flex flex-col items-center gap-8 px-10 pt-20">
				{/* Hero Title */}
				<div className="flex flex-col items-center gap-3">
					<h1 className="flex items-center gap-3 text-4xl font-bold font-mono text-text-primary">
						<span className="text-accent-green">$</span>
						paste your code. get roasted.
					</h1>
					<p className={`font-mono text-sm transition-colors ${roastMode ? "text-accent-green" : "text-text-secondary"}`}>
						// drop your code below and we&apos;ll rate it — brutally honest {roastMode && <span className="text-accent-green">or full roast mode</span>}
					</p>
				</div>

				{/* Code Input */}
				<CodeBlock className="w-[780px] h-[360px]" language={language}>
					<CodeHeader className="h-10">
						<CodeDot color="red" />
						<CodeDot color="amber" />
						<CodeDot color="green" />
						<select
							value={language}
							onChange={(e) => setLanguage(e.target.value)}
							className="ml-auto bg-transparent text-xs font-mono text-text-tertiary focus:outline-none cursor-pointer"
						>
							{languages.map((lang) => (
								<option key={lang.value} value={lang.value} className="bg-bg-surface">
									{lang.label}
								</option>
							))}
						</select>
					</CodeHeader>
					<CodeBody className="h-[calc(100%-40px)]">
						<CodeLineNumbers>
							{Array.from({ length: Math.max(lineCount, 16) }, (_, i) => (
								<span key={i}>{i + 1}</span>
							))}
						</CodeLineNumbers>
					</CodeBody>
				</CodeBlock>

				{/* Actions Bar */}
				<div className="flex items-center justify-between w-[780px]">
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-3">
							<Toggle checked={roastMode} onCheckedChange={setRoastMode} />
							<span className={`font-mono text-xs transition-colors ${roastMode ? "text-accent-green" : "text-text-tertiary"}`}>
								// {roastMode ? "maximum sarcasm enabled" : "maximum sarcasm disabled"}
							</span>
						</div>
					</div>
					<Button 
						onClick={handleSubmit}
						disabled={!code.trim() || isSubmitting}
					>
						<span className="text-black">$</span> roast_my_code
					</Button>
				</div>

				{/* Footer Stats */}
				<div className="flex items-center gap-6 text-text-tertiary font-mono text-xs">
					<span>2,847 codes roasted</span>
					<span>·</span>
					<span>avg score: 4.2/10</span>
				</div>

				<div className="h-[60px]" />

				{/* Leaderboard Preview */}
				<div className="flex flex-col gap-6 w-[960px]">
					<div className="flex items-center justify-between">
						<h2 className="flex items-center gap-2 text-sm font-bold font-mono text-text-primary">
							<span className="text-accent-green">//</span>
							shame_leaderboard
						</h2>
						<Link
							href="/leaderboard"
							className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-text-secondary border border-border-primary hover:bg-bg-elevated transition-colors"
						>
							$ view_all &gt;&gt;
						</Link>
					</div>
					<p className="text-text-tertiary font-mono text-xs">
						// the worst code on the internet, ranked by shame
					</p>

					{/* Leaderboard Table */}
					<div className="border border-border-primary">
						{/* Header */}
						<div className="flex items-center h-10 px-5 bg-bg-surface border-b border-border-primary">
							<span className="w-[50px] text-xs font-mono text-text-tertiary">
								rank
							</span>
							<span className="w-[70px] text-xs font-mono text-text-tertiary">
								score
							</span>
							<span className="flex-1 text-xs font-mono text-text-tertiary">
								code
							</span>
							<span className="w-[100px] text-xs font-mono text-text-tertiary">
								lang
							</span>
						</div>

						{/* Rows */}
						{leaderboardData.map((item, index) => (
							<div
								key={index}
								className="flex items-center px-5 py-4 border-b border-border-primary last:border-b-0"
							>
								<span className="w-[50px] text-sm font-mono text-text-secondary">
									{item.rank}
								</span>
								<div className="w-[70px]">
									<ScoreRing
										score={item.score}
										size="sm"
										className="h-12 w-12"
									/>
								</div>
								<span className="flex-1 text-sm font-mono text-text-primary">
									{item.code}
								</span>
								<span className="w-[100px] text-xs font-mono text-text-tertiary">
									{item.language}
								</span>
							</div>
						))}
					</div>

					{/* Fade Hint */}
					<p className="text-center text-xs font-mono text-text-tertiary py-4">
						showing top 3 of 2,847 · view full leaderboard &gt;&gt;
					</p>
				</div>

				<div className="h-[60px]" />
			</main>
		</div>
	);
}