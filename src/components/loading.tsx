import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type LoadingProps = {
	className?: string;
};

const Loading = (props: LoadingProps) => {
	const { className } = props;

	return (
		<div
			className={cn(
				"flex items-center justify-center h-screen w-full",
				className,
			)}
		>
			<Spinner />
		</div>
	);
};

export default Loading;
