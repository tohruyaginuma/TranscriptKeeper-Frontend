import { Briefcase, GraduationCap, Users } from "lucide-react";

const useCases = [
  {
    icon: Briefcase,
    title: "Job Interviews",
    description:
      "Never miss important details during interviews. Review conversations later to clarify understanding and prepare better follow-ups.",
  },
  {
    icon: Users,
    title: "Team Meetings",
    description:
      "Keep accurate records of decisions and action items. Focus on the conversation while the app handles note-taking.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Training",
    description:
      "Capture online courses, webinars, and training sessions. Review complex topics at your own pace.",
  },
];

export function UseCasesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Perfect for every conversation
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you{"'"}re interviewing, collaborating, or learning —
            accurate transcription makes all the difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="text-center p-8 rounded-2xl border border-border bg-card"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <useCase.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
