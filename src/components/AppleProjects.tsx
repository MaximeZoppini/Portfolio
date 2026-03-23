import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    name: "JustMakeit!",
    title: "API Gateway",
    description: "Secure, scalable microservices orchestration.",
    image: "https://images.unsplash.com/photo-1735905131163-cd06ac8e8632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzYzNzM2MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    theme: "from-green-500/20 to-emerald-500/20",
  },
];

export function AppleProjects() {
  return (
    <div id="projects" className="bg-black">
      {projects.map((project, index) => (
        <section
          key={project.name}
          className="relative flex items-center pt-24 pb-12 md:pt-32 md:pb-16 px-6 overflow-hidden"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.theme} opacity-30`} />

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={index % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="mb-4">
                  <span className="text-slate-500 tracking-widest uppercase">
                    Project
                  </span>
                </div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight" style={{ fontWeight: 600 }}>
                  {project.name}
                </h2>

                <h3 className="text-2xl md:text-3xl text-slate-300 mb-8">
                  {project.title}
                </h3>

                <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-lg leading-relaxed">
                  {project.description}
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-slate-100 px-8 h-14 group"
                  >
                    View Live Demo
                    <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Visual side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={index % 2 === 1 ? "lg:order-1" : ""}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.theme} blur-3xl opacity-50`} />
                  
                  {/* Image container */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
