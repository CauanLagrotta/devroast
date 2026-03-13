import { getHighlighter } from "./code-block";

interface CodeHighlightProps {
	code: string;
	language?: string;
}

export async function CodeHighlight({
	code,
	language = "typescript",
}: CodeHighlightProps) {
	const highlighter = await getHighlighter();
	const html = highlighter.codeToHtml(code, {
		lang: language,
		theme: "vesper",
	});

	return (
		<div
			className="shiki-container flex-1 overflow-x-auto py-3 px-3"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
