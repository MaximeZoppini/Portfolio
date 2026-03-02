import { motion } from "motion/react";
import { Code2, Container, Database, Server, Layers, Shield } from "lucide-react";

const stack = [
  { name: "Java", icon: Code2 },
  { name: "Spring", icon: Layers },
  { name: "Docker", icon: Container },
  { name: "PostgreSQL", icon: Database },
  { name: "Proxmox", icon: Server },
  { name: "Security", icon: Shield },
];

export function AppleStack() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl text-slate-400 mb-4 tracking-wide">
            Built with industry standards.
          </h2>
        </motion.div>

        {/* Logo grid - horizontal row */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-24">
          {stack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors">
                <tech.icon className="size-8 md:size-10 text-white/90" strokeWidth={1.5} />
              </div>
              <span className="text-slate-500 text-sm md:text-base tracking-wide">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-24"
        >
          <p className="text-slate-600 text-lg">
            Precision-engineered for reliability and performance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
