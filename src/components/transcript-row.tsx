import { cn } from "@/lib/utils";

type TranscriptRowProps = {
	text: string;
	hasBackground?: boolean;
};

const TranscriptRow = (props: TranscriptRowProps) => {
	const { text, hasBackground = false } = props;

	return (
		<div className={cn("w-full px-4 py-2", hasBackground && "bg-gray-100")}>
			<span className="text-gray-500">{text}</span>
		</div>
	);
};

export default TranscriptRow;
