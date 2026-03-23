import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Server, Rocket, Cpu, Globe, X, Shield, Lock, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function AboutWebsite({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-slate-950 border-white/5 text-slate-200 rounded-[2.5rem] p-0 shadow-2xl overflow-hidden ring-1 ring-white/10">
        <div className="relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px]" />

          <div className="p-8 md:p-12 relative z-10">
            <div className="absolute top-6 right-6 z-50">
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                  <X className="size-5" />
                </Button>
              </DialogClose>
            </div>

            <DialogHeader className="mb-10 text-center flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="size-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl border border-white/10 flex items-center justify-center mb-6 shadow-glow shadow-blue-500/10"
              >
                <Shield className="size-8 text-blue-400" />
              </motion.div>
              <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-white via-white/80 to-white/20 bg-clip-text text-transparent tracking-tighter">
                Infrastructure Core
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-base leading-relaxed mt-3 max-w-sm mx-auto">
                Discover the high-end tech stack powering this autonomous portfolio.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 scrollbar-hide">
              {/* Feature Cards */}
              {[
                { 
                  icon: Globe, 
                  title: "Cloudflare Zero Trust", 
                  desc: "Encrypted Argo tunnels instead of dangerous open ports.", 
                  color: "text-blue-400", 
                  bg: "bg-blue-500/10" 
                },
                { 
                  icon: Rocket, 
                  title: "Automated Orchestration", 
                  desc: "Coolify manages isolated Docker containers via GitHub CI/CD.", 
                  color: "text-purple-400", 
                  bg: "bg-purple-500/10" 
                },
                { 
                  icon: Cpu, 
                  title: "Proxmox Virtualization", 
                  desc: "Mac Mini Home Lab running dedicated Linux VMs for isolation.", 
                  color: "text-emerald-400", 
                  bg: "bg-emerald-500/10" 
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="group flex gap-5 p-5 bg-white/5 border border-white/5 rounded-[1.5rem] hover:bg-white/10 hover:border-white/10 transition-all cursor-default"
                >
                  <div className={`shrink-0 p-3 ${item.bg} rounded-2xl border border-white/5 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`size-6 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/5">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-blue-400/80">
                  <Activity className="size-3 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Server Status: Online</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Lock className="size-3" />
                  <span className="text-[10px] uppercase font-medium">SSL 256-bit AES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
