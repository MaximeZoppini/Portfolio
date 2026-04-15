import { useState } from "react";
import { motion } from "motion/react";

import { Github, Linkedin, Mail, Download } from "lucide-react";

import { AboutWebsite } from "./AboutWebsite";

export function AppleFooter({ isInfected }: { isInfected?: boolean }) {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("zoppinimax@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };


  return (
    <footer 
      className="relative py-4 px-4 bg-black border-t border-white/5"
      style={{ flexShrink: 0 }}
    >
      <style>
        {`
          @media (max-width: 640px) {
            .footer-btn {
              padding: 0.75rem !important;
            }
            .footer-btn span {
              display: none !important;
            }
            .footer-container {
              gap: 1rem !important;
            }
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          
          {/* Contact links */}
          <div className="footer-container flex flex-wrap justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/MaximeZoppini"
              target="_blank" rel="noopener noreferrer"
              className="footer-btn flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white transition-colors"
            >
              <Github className="size-5" strokeWidth={0.5} />
              <span>{isInfected ? "Yes" : "GitHub"}</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/MaximeZoppini_Resume.pdf"
              download="MaximeZoppini_Resume.pdf"
              className="footer-btn flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white transition-colors"
            >
              <Download className="size-5" strokeWidth={0.5} />
              <span>{isInfected ? "Yes" : "Download CV"}</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/maximezoppini/"
              target="_blank" rel="noopener noreferrer"
              className="footer-btn flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white transition-colors"
            >
              <Linkedin className="size-5" strokeWidth={0.5} />
              <span>{isInfected ? "Yes" : "LinkedIn"}</span>
            </motion.a>

            <div className="relative inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyEmail}
                className="footer-btn flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-white transition-colors"
              >
                <Mail className="size-5" strokeWidth={0.5} />
                <span>{isInfected ? "Yes" : "zoppinimax@gmail.com"}</span>
              </motion.button>
              {emailCopied && (
                <span 
                  className="absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-sm border border-white/20 text-white shadow-xl pointer-events-none whitespace-nowrap z-50"
                  style={{ top: "-45px" }}
                >
                  Mail copié !
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
