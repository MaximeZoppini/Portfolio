import { useState } from "react";
import { ChatInterface } from "./components/ChatInterface";
import { AppleFooter } from "./components/AppleFooter";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

export default function App() {
  const [isInfected, setIsInfected] = useState(false);
  const [showBigYes, setShowBigYes] = useState(false);

  return (
    <div 
      className="bg-black dark antialiased"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <ChatInterface 
        isInfected={isInfected} 
        onInfect={() => {
          setIsInfected(true);
          setShowBigYes(true);
        }} 
      />
      <AppleFooter isInfected={isInfected} />

      {/* ── Big YES Finale Overlay (Full Screen) ── */}
      <AnimatePresence>
        {showBigYes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 z-[1000] flex items-center justify-center pointer-events-none"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
          >
            <motion.h1
              initial={{ scale: 5, opacity: 0, letterSpacing: "40px", filter: "blur(10px)" }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                letterSpacing: "4px", 
                filter: "blur(0px)",
                textShadow: [
                  "0 0 20px rgba(255, 214, 10, 0.4)",
                  "0 0 40px rgba(255, 214, 10, 0.8)",
                  "0 0 20px rgba(255, 214, 10, 0.4)"
                ]
              }}
              transition={{ 
                scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8 },
                letterSpacing: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                textShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                delay: 1
              }}
              style={{
                fontSize: "min(12vw, 120px)",
                fontWeight: 900,
                color: "#FFD60A",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                textAlign: "center"
              }}
            >
              YES.
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}