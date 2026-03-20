import type { PropsWithChildren } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

type LayoutProps = PropsWithChildren<{
	withHeader?: boolean;
	withFooter?: boolean;
}>;

const BaseLayout = ({ children }: LayoutProps) => {
	return (
		<main className="flex flex-col min-h-screen bg-background">
			<Header />
			<div className="pt-16 flex-1">{children}</div>
			<Footer />
			<Toaster />
		</main>
	);
};

export default BaseLayout;
