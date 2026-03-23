import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "SDE Intern",
    company: "Amazon Web Services (AWS)",
    period: "06.2025 - 10.2025",
    description: "Dublin, Ireland. Migrated SES 'OpsDeck' to TypeScript/AWS CDK (IaC). Developed a Python engine for automated URI mapping. Leveraged GenAI to reduce documentation processing time by 60%.",
    logo: "☁️",
  },
  {
    type: "work",
    title: "Cybersecurity Department",
    company: "Energy Pool",
    period: "11.2024 - Present",
    description: "Lyon, France. Managed corporate endpoint security for 300 users (99.9% uptime). Mitigated critical intrusions and contributed to ISO 27001 certification and risk management strategies.",
    logo: "🛡️",
  },
  {
    type: "work",
    title: "Tech Support & Project Manager Intern",
    company: "Energy Pool",
    period: "06.2024 - 08.2024",
    description: "Lyon, France. Led a Jira migration project, gathering requirements and coordinating with stakeholders. Trained colleagues on Jira tools and best practices.",
    logo: "📊",
  },
  {
    type: "education",
    title: "M.S. Cybersecurity",
    company: "University of Technology",
    period: "2022 - 2024",
    description: "Specialized in network security, cryptography, and ethical hacking.",
    logo: "🎓",
  },
  {
    type: "work",
    title: "Developer Intern",
    company: "La Grande Pharmacie des Forestiers",
    period: "01.2023 - 02.2023",
    description: "Libreville, Gabon. Software development internship.",
    logo: "💊",
  },
  {
    type: "work",
    title: "Web Developer Intern",
    company: "POWER",
    period: "05.2022 - 06.2022",
    description: "Lyon, France. Web development internship.",
    logo: "⚡",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 md:py-48 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl md:text-7xl text-white mb-6 tracking-tight font-semibold">
            Experience & Education
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A journey through professional development and academic excellence
          </p>
        </motion.div>

        {/* Experience items - Centered Stack */}
        <div className="space-y-32">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center border border-white/10 mb-8 shadow-2xl">
                <span className="text-4xl">{exp.logo}</span>
              </div>
              <div className="max-w-3xl">
                <h3 className="text-3xl md:text-4xl text-white font-semibold mb-2 tracking-tight">
                  {exp.title}
                </h3>
                <p className="text-xl text-blue-400 font-medium mb-4">
                  {exp.company}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-500 text-sm font-medium mb-8">
                  {exp.type === "work" ? <Briefcase className="size-4" /> : <GraduationCap className="size-4" />}
                  {exp.period}
                </div>
                <p className="text-xl text-slate-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-48"
        >

        </motion.div>
      </div>
    </section>
  );
}
