import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Senior Security Engineer",
    company: "TechCorp Security",
    period: "2023 - Present",
    description: "Leading security architecture design and implementation for enterprise clients. Focus on zero-trust frameworks and cloud security.",
    logo: "💼",
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2021 - 2023",
    description: "Built scalable microservices architecture using Java Spring Boot. Implemented CI/CD pipelines and container orchestration.",
    logo: "🚀",
  },
  {
    type: "education",
    title: "M.S. Cybersecurity",
    company: "University of Technology",
    period: "2022 - 2024",
    description: "Specialized in network security, cryptography, and ethical hacking. Research focus on AI-powered threat detection.",
    logo: "🎓",
  },
  {
    type: "work",
    title: "Junior Developer",
    company: "DevAgency",
    period: "2020 - 2021",
    description: "Developed web applications using React and Node.js. Contributed to open-source security tools and libraries.",
    logo: "💻",
  },
];

export function Experience() {
  return (
    <section className="relative py-24 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Experience & Education
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A journey through professional development and academic excellence
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block" />

          {/* Experience items */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-8 top-6 w-4 h-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-slate-900 hidden md:block" />

                {/* Content card */}
                <div className="md:ml-20">
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600">
                          <span className="text-2xl">{exp.logo}</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-xl text-white mb-1">
                              {exp.title}
                            </h3>
                            <p className="text-slate-400">
                              {exp.company}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                            {exp.type === "work" ? (
                              <Briefcase className="size-4" />
                            ) : (
                              <GraduationCap className="size-4" />
                            )}
                            <span>{exp.period}</span>
                          </div>
                        </div>
                        <p className="text-slate-400">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6">
            <h3 className="text-xl mb-4 text-white">Certifications & Awards</h3>
            <div className="flex flex-wrap gap-3">
              {["CEH", "OSCP", "AWS Security", "CISSP", "CompTIA Security+"].map((cert) => (
                <motion.div
                  key={cert}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-slate-300"
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
