import { motion } from "motion/react";
import { Activity, Zap, Network } from "lucide-react";

const specs = [
  {
    value: "99.99%",
    label: "Uptime",
    icon: Activity,
  },
  {
    value: "10Gbps",
    label: "Fabric",
    icon: Network,
  },
  {
    value: "<50ms",
    label: "Latency",
    icon: Zap,
  },
];

export function AppleSpecs() {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight" style={{ fontWeight: 600 }}>
            Enterprise-Grade
            <br />
            Performance.
          </h2>
          <p className="text-xl md:text-2xl text-slate-400">
            Built for mission-critical operations.
          </p>
        </motion.div>

        {/* Specs display - Apple M5 style */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-20 max-w-6xl mx-auto">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
                  <spec.icon className="size-8 text-white" strokeWidth={1.5} />
                </div>
              </div>

              {/* Value */}
              <div className="text-6xl md:text-7xl lg:text-8xl text-white mb-4 tracking-tight" style={{ fontWeight: 600 }}>
                {spec.value}
              </div>

              {/* Label */}
              <div className="text-xl md:text-2xl text-slate-400 tracking-wide">
                {spec.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional context */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-32"
        >
          <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
            Self-hosted Proxmox infrastructure with redundant power, automated failover, 
            and real-time monitoring. Every layer designed for zero compromise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
