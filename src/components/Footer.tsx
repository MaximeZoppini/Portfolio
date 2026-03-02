import { motion } from "motion/react";
import { Github, Linkedin, Mail, Server } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="relative py-16 px-6 bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl mb-3 text-white">
              Let's Build Something Secure
            </h3>
            <p className="text-slate-400 mb-6">
              Open to collaborations, consulting opportunities, and interesting projects. 
              Always excited to discuss cybersecurity and system architecture.
            </p>
            
            {/* Hosted badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full">
              <Server className="size-4 text-orange-400" />
              <span className="text-orange-300">Hosted locally on Proxmox</span>
            </div>
          </motion.div>

          {/* Right side - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h4 className="text-white mb-4">Connect With Me</h4>
            <div className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-800 hover:text-white hover:border-slate-600"
                  variant="outline"
                >
                  <Github className="mr-2 size-5" />
                  GitHub
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-800 hover:text-white hover:border-slate-600"
                  variant="outline"
                >
                  <Linkedin className="mr-2 size-5" />
                  LinkedIn
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-800 hover:text-white hover:border-slate-600"
                  variant="outline"
                >
                  <Mail className="mr-2 size-5" />
                  Email
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-slate-500">
            © 2024 CS & Cybersecurity Portfolio. Built with React, TypeScript, and Tailwind.
          </p>
          <div className="flex gap-6 text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
