import Logo from "@/components/logo";

const Footer = () => {
	return (
		<footer className="border-t border-border py-12 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<Logo />

					<p className="text-sm text-muted-foreground">
						© 2026 Transcript Keeper. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
