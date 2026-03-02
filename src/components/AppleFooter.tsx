import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function AppleFooter() {
  return (
    <footer className="relative py-20 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight" style={{ fontWeight: 600 }}>
            Let's build something
            <br />
            exceptional.
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Available for select consulting engagements.
          </p>

          {/* Contact links */}
          <div className="flex flex-wrap justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white transition-colors"
            >
              <Github className="size-5" />
              <span>GitHub</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white transition-colors"
            >
              <Linkedin className="size-5" />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white transition-colors"
            >
              <Mail className="size-5" />
              <span>Email</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-12 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600">
            <p>© 2024 The Secure Core. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
