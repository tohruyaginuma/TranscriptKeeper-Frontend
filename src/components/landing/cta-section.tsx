"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export function CTASection() {
	const navigate = useNavigate();

	return (
		<section className="py-24 px-6">
			<div className="max-w-4xl mx-auto">
				<div className="relative rounded-3xl border border-border bg-card p-12 md:p-16 text-center overflow-hidden">
					{/* Background accent */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

					<div className="relative z-10">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
							Start transcribing your meetings today
						</h2>
						<p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
							Join thousands of professionals who trust Transcript Keeper for
							their meeting documentation needs.
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
								onClick={() => navigate("/download")}
							>
								<Download className="w-5 h-5" />
								Download Desktop App
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
