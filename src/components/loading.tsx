import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type LoadingProps = {
	isFullScreen?: boolean;
	className?: string;
};

const Loading = (props: LoadingProps) => {
	const { className, isFullScreen = false } = props;

	return (
		<div
			className={cn(
				"flex items-center justify-center",
				{ "h-screen w-full": isFullScreen },
				className,
			)}
		>
			<Spinner />
		</div>
	);
};

export default Loading;
