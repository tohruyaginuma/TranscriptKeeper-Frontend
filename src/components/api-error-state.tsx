import type { PropsWithChildren } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type ApiErrorStateProps = PropsWithChildren<{
	title: string;
	message: string;
	onRetry?: () => void;
	className?: string;
}>;

const ApiErrorState = (props: ApiErrorStateProps) => {
	const { title, message, onRetry, className, children } = props;

	return (
		<Card className={className}>
			<CardHeader>
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
						<AlertCircle className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<CardTitle>{title}</CardTitle>
						<CardDescription>{message}</CardDescription>
					</div>
				</div>
				</CardHeader>
				{(onRetry || children) && (
					<CardFooter className="gap-3">
						{onRetry && (
							<Button type="button" onClick={onRetry}>
								Try again
							</Button>
						)}
						{children}
					</CardFooter>
				)}
			</Card>
		);
};

export default ApiErrorState;
