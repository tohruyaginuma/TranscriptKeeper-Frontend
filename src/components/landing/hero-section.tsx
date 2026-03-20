import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { openDownloadUrl } from "@/lib/utils";
import { useNavigate } from "react-router";

export function HeroSection() {
	const navigate = useNavigate();

	return (
		<section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
			{/* Background gradient effect */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

			<div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-8">
					<span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
					No recording bot required
				</div>

				<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
					Never Miss a Word in Your Meetings
				</h1>

				<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
					Private meeting transcription for professionals who need accurate
					notes. Perfect for job interviews and important conversations — no
					bots joining your calls.
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					<Button
						size="lg"
						className="gap-2 px-8 h-12 text-base"
						onClick={() => navigate("/signin")}
					>
						<ArrowRight className="w-5 h-5" />
						Sign Up Free
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="gap-2 px-8 h-12 text-base"
						onClick={openDownloadUrl}
					>
						<Download className="w-5 h-5" />
						Download Desktop App
					</Button>
				</div>

				<p className="mt-6 text-sm text-muted-foreground">
					Free to start • Windows & macOS • No credit card required
				</p>
			</div>
		</section>
	);
}
