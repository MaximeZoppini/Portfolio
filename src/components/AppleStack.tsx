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
    <section className="relative pt-12 pb-12 md:pt-16 md:pb-16 px-6 bg-black">
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

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 text-lg">
            Precision-engineered for reliability and performance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
