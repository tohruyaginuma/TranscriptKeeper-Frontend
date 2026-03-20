import BaseLayout from "@/components/base-layout";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { UseCasesSection } from "@/components/landing/use-cases-section";
import { CTASection } from "@/components/landing/cta-section";

const LandingPage = () => {
	return (
		<BaseLayout>
			<HeroSection />
			<section id="features">
				<FeaturesSection />
			</section>
			<section id="how-it-works">
				<HowItWorksSection />
			</section>
			<section id="use-cases">
				<UseCasesSection />
			</section>
			<CTASection />
		</BaseLayout>
	);
};

export default LandingPage;
