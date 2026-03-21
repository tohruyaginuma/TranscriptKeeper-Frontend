import type { PropsWithChildren } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

type LayoutProps = PropsWithChildren<{
	IsNoHeader?: boolean;
	IsNoFooter?: boolean;
	className?: string;
}>;

const BaseLayout = ({
	children,
	IsNoHeader = false,
	IsNoFooter = false,
	className,
}: LayoutProps) => {
	return (
		<main className="flex flex-col min-h-screen bg-background">
			{!IsNoHeader && <Header />}
			<div className={cn("flex-1", IsNoHeader ? "pt-0" : "pt-16", className)}>
				{children}
			</div>
			{!IsNoFooter && <Footer />}
		</main>
	);
};

export default BaseLayout;
