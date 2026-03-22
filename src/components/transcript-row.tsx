import { cn } from "@/lib/utils";

type TranscriptRowProps = {
	text: string;
	hasBackground?: boolean;
};

const TranscriptRow = (props: TranscriptRowProps) => {
	const { text, hasBackground = false } = props;

	return (
		<div className={cn("w-full px-4 py-2", hasBackground && "bg-secondary/50")}>
			<span className="text-white">{text}</span>
		</div>
	);
};

export default TranscriptRow;
