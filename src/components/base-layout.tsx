import type { PropsWithChildren } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

type LayoutProps = PropsWithChildren<{
	withHeader?: boolean;
	withFooter?: boolean;
}>;

const BaseLayout = ({
	children,
	withHeader = true,
	withFooter = true,
}: LayoutProps) => {
	return (
		<div className="flex flex-col min-h-screen">
			{withHeader && <Header />}
			<main className="flex-1 m-auto w-full max-w-4xl py-6 px-4">
				{children}
			</main>
			{withFooter && <Footer />}
		</div>
	);
};

export default BaseLayout;
