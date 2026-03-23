import { motion } from "motion/react";
import { Server, Shield, Zap, HardDrive, Network, Activity, Cpu, Rocket, Globe } from "lucide-react";

const infraStats = [

];

const securityLayers = [
  { name: "Cloudflare Tunnel", description: "Secure Argo tunnel for port-less exposure and IP masking.", status: "Active" },
  { name: "Tailscale VPN", description: "Remote administration via WireGuard-based mesh network.", status: "Active" },
  { name: "Traefik Proxy", description: "Automatic routing and SSL certificate management.", status: "Active" },
  { name: "DNSSEC", description: "Dynamic DNS management via OVH & Cloudflare.", status: "Active" },
];

const infraPillars = [
  {
    title: "Server & Virtualization",
    icon: Cpu,
    description: "Physical Mac Mini running Proxmox VE (Type 1 Hypervisor). Optimized Debian LXC containers for Docker workloads with advanced IPv4/IPv6 networking.",
  },
  {
    title: "Orchestration & CI/CD",
    icon: Rocket,
    description: "Coolify PaaS for automated deployments. GitHub Webhooks trigger automatic builds via Nixpacks for a seamless development workflow.",
  },
  {
    title: "Networking & Security",
    icon: Globe,
    description: "Zero-trust architecture using Cloudflare Tunnels to eliminate open ports. DDoS protection and secure remote access via Tailscale.",
  },
];

export function Infrastructure() {
  return (
    <section id="infrastructure" className="relative pt-12 pb-12 md:pt-16 md:pb-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl md:text-7xl text-white mb-6 tracking-tight font-semibold">
            The Infrastructure
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A professional self-hosted ecosystem on physical hardware (Mac Mini), engineered for autonomy and security.
          </p>
        </motion.div>

        {/* Main Control Center Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-20 relative">
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center gap-6 mb-20">
                <div className="p-6 bg-white text-black rounded-[2rem] shadow-2xl">
                  <Server className="size-10" />
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl text-white font-semibold tracking-tight">The Secure Core</h3>
                  <p className="text-xl text-slate-400">Enterprise Virtualization Platform</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                {infraStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 shadow-lg`}>
                      <stat.icon className="size-6 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-white tracking-tighter">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-[0.2em] font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Infrastructure Pillars */}
              <div className="grid md:grid-cols-3 gap-16">
                {infraPillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-6">
                      <pillar.icon className="size-8 text-blue-400" />
                    </div>
                    <h4 className="text-2xl text-white font-semibold mb-4 tracking-tight">{pillar.title}</h4>
                    <p className="text-lg text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Layers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-12 md:p-20">
            <h3 className="text-4xl mb-16 text-white flex items-center justify-center gap-4 font-semibold tracking-tight">
              <Shield className="size-6" />
              Security Layers
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {securityLayers.map((layer, index) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 text-xs font-bold uppercase tracking-widest">{layer.status}</span>
                  </div>
                  <h4 className="text-xl text-white font-semibold mb-3">{layer.name}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{layer.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
