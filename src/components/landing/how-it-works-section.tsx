const steps = [
	{
		step: "01",
		title: "Download & Install",
		description:
			"Get the macOS desktop app from the download page. Simple installation with no complex setup required.",
	},
	{
		step: "02",
		title: "Start Recording",
		description:
			"Begin your meeting and click record. The app captures system audio and your microphone simultaneously.",
	},
	{
		step: "03",
		title: "Get Your Transcript",
		description:
			"Once the meeting ends, your audio is automatically transcribed using AI-powered speech-to-text.",
	},
	{
		step: "04",
		title: "Review Anywhere",
		description:
			"Access your transcripts through the web interface on any device. Search, review, and export your notes.",
	},
];

export function HowItWorksSection() {
	return (
		<section className="py-24 px-6 bg-secondary/30">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
						How it works
					</h2>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						From installation to transcript in four simple steps.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((item) => (
						<div key={item.step} className="relative">
							<div className="text-5xl font-bold text-primary/20 mb-4">
								{item.step}
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-3">
								{item.title}
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
