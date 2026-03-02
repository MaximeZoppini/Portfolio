import { motion } from "motion/react";
import { Code2, Database, Container, Server, Terminal, Shield, Layers, GitBranch } from "lucide-react";

const techStack = [
  { name: "Java", icon: Code2, color: "from-orange-500 to-red-500", span: "col-span-1 row-span-1" },
  { name: "Spring Boot", icon: Layers, color: "from-green-500 to-emerald-500", span: "col-span-1 row-span-1" },
  { name: "React/Next.js", icon: GitBranch, color: "from-blue-500 to-cyan-500", span: "col-span-1 row-span-2" },
  { name: "Docker", icon: Container, color: "from-blue-600 to-blue-700", span: "col-span-1 row-span-1" },
  { name: "Python", icon: Terminal, color: "from-yellow-500 to-blue-500", span: "col-span-1 row-span-1" },
  { name: "Proxmox", icon: Server, color: "from-orange-600 to-red-600", span: "col-span-1 row-span-1" },
  { name: "PostgreSQL", icon: Database, color: "from-blue-700 to-indigo-700", span: "col-span-1 row-span-1" },
  { name: "Security", icon: Shield, color: "from-purple-500 to-pink-500", span: "col-span-1 row-span-2" },
];

export function TechStack() {
  return (
    <section className="relative py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Tech Stack & Expertise
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Cybersecurity student and full-stack engineer specializing in secure, scalable architectures. 
            Passionate about building resilient systems with modern technologies.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${tech.span} relative group`}
            >
              <div className="h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 overflow-hidden relative hover:border-slate-700/50 transition-all">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} mb-4`}>
                  <tech.icon className="size-6 text-white" />
                </div>

                {/* Tech name */}
                <h3 className="relative z-10 text-white">
                  {tech.name}
                </h3>

                {/* Decorative element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-slate-800/20 rounded-full blur-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2 text-white">5+</div>
                <div className="text-slate-400">Years Coding</div>
              </div>
              <div>
                <div className="text-3xl mb-2 text-white">50+</div>
                <div className="text-slate-400">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl mb-2 text-white">100%</div>
                <div className="text-slate-400">Self-Hosted</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
