import { motion } from "motion/react";
import { Activity, Zap, Network } from "lucide-react";


export function AppleSpecs() {
  return (
    <section className="relative py-12 md:py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >

        </motion.div>
      </div>
    </section>
  );
}
