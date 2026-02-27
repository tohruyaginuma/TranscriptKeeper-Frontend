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
			<main className="flex-1 m-auto max-w-4xl p-4">{children}</main>
			{withFooter && <Footer />}
		</div>
	);
};

export default BaseLayout;
