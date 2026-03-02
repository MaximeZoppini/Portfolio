import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AppleHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-6 py-24">
      {/* Announcement bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12"
      >
        <p className="text-slate-400 tracking-wider uppercase">
          The Secure Core
        </p>
      </motion.div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-center mb-6"
      >
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tighter mb-4" style={{ 
          fontWeight: 600,
          lineHeight: 0.95 
        }}>
          MZ.
        </h1>
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tighter" style={{ 
          fontWeight: 600,
          lineHeight: 0.95 
        }}>
          
        </h1>
      </motion.div>

      {/* Subheadline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center mb-20"
      >
        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
          Powered by Proxmox on Mac Pro architecture.
        </p>
      </motion.div>

      {/* Product image - Mac Pro inspired */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="relative w-full max-w-5xl mx-auto"
      >
        <div className="relative aspect-[16/10]">
          {/* Dramatic lighting effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-radial from-white/20 via-transparent to-transparent blur-3xl" />
          
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1605135694050-444e21ac7fe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWMlMjBwcm8lMjB0b3dlciUyMGJsYWNrfGVufDF8fHx8MTc2MzczNjM0OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Secure Core Infrastructure"
            className="w-full h-full object-contain relative z-0"
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-slate-600"
        >
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <path d="M10 5L10 20M10 20L5 15M10 20L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
