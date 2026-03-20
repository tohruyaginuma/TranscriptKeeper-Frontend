import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type HeadingProps = PropsWithChildren<{
	level: 1 | 2 | 3;
}>;

const Heading = (props: HeadingProps) => {
	const { children, level = 1 } = props;

	const As = useMemo(() => {
		switch (level) {
			case 1:
				return (
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
						{children}
					</h1>
				);
			case 2:
				return (
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
						{children}
					</h2>
				);
			case 3:
				return (
					<h3 className="text-xl font-semibold text-foreground mb-3">
						{children}
					</h3>
				);
			default:
				return (
					<h3 className="text-xl font-semibold text-foreground mb-3">
						{children}
					</h3>
				);
		}
	}, [level, children]);

	return As;
};

export default Heading;
