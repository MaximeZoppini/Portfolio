import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Server, Briefcase, Info } from "lucide-react";

import { AboutWebsite } from "./AboutWebsite.tsx";



export function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">

        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>


      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-slate-400 text-sm tracking-widest uppercase">Available for opportunities</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8 text-white tracking-tighter font-semibold leading-[1.1]">
             Maxime's Portfolio
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Security Engineer
            </span>
          </h1>


          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto">
            Computer Science & Cybersecurity 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 px-8 h-12 group"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Work
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-slate-800/30 backdrop-blur-md border-slate-700/50 text-white hover:bg-slate-800/50 hover:text-white px-8 h-12 group"
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Briefcase className="mr-2 size-4" />
                Experience
              </Button>
            </motion.div>

            <AboutWebsite>
              <div className="relative p-[1px] rounded-full overflow-hidden group cursor-pointer shadow-lg hover:shadow-blue-500/20 transition-shadow">
                {/* Border Beam Animation */}
                <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#3b82f6_50%,#0f172a_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <Button
                  size="lg"
                  variant="outline"
                  className="relative inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-8 text-sm font-medium text-white backdrop-blur-3xl border-slate-800/50 hover:bg-slate-950/80 transition-all gap-2"
                >
                  <Info className="size-4 text-blue-400 group-hover:rotate-12 transition-transform" />
                  <span>About this website's architecture</span>
                </Button>
              </div>
            </AboutWebsite>





          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
