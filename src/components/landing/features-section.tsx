import { Mic, Globe, Shield, FileText } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "System Audio & Mic Capture",
    description:
      "Capture both your voice and meeting audio directly from your desktop. No need for bots to join your calls.",
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    description:
      "Review your transcripts from any device through our web-based interface. Your notes are always accessible.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description:
      "Your transcripts are protected with authentication. Only you can access your confidential meeting notes.",
  },
  {
    icon: FileText,
    title: "AI-Powered Transcription",
    description:
      "Accurate speech-to-text powered by Whisper API. Get reliable transcripts even with multiple speakers.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything you need for meeting notes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for second-language speakers who need reliable documentation
            of every conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl border border-border bg-card hover:bg-secondary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
