import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type HeadingProps = PropsWithChildren<{
	level: 1 | 2;
}>;

const Heading = (props: HeadingProps) => {
	const { children, level } = props;

	const As = level === 1 ? "h1" : "h2";

	return (
		<As
			className={cn(
				"text-2xl font-bold",
				level === 1 ? "text-4xl" : "text-3xl",
			)}
		>
			{children}
		</As>
	);
};

export default Heading;
