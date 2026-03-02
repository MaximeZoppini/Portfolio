import { motion } from "motion/react";
import { Server, Shield, Zap, HardDrive, Network, Activity } from "lucide-react";

const infraStats = [
  { label: "Uptime", value: "99.9%", icon: Activity, color: "from-green-500 to-emerald-500" },
  { label: "Response Time", value: "<50ms", icon: Zap, color: "from-yellow-500 to-orange-500" },
  { label: "Storage", value: "2TB SSD", icon: HardDrive, color: "from-blue-500 to-cyan-500" },
  { label: "Network", value: "10Gbps", icon: Network, color: "from-purple-500 to-pink-500" },
];

const securityLayers = [
  { name: "WAF", description: "Web Application Firewall", status: "Active" },
  { name: "DDoS Protection", description: "CloudFlare Shield", status: "Active" },
  { name: "SSL/TLS", description: "Let's Encrypt", status: "Active" },
  { name: "IDS/IPS", description: "Intrusion Detection", status: "Active" },
];

export function Infrastructure() {
  return (
    <section id="infrastructure" className="relative py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            The Infrastructure
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Self-hosted on Proxmox VE with enterprise-grade security and monitoring
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
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-8 overflow-hidden relative">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, rgb(148, 163, 184) 1px, transparent 1px),
                  linear-gradient(to bottom, rgb(148, 163, 184) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                  <Server className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl text-white">Proxmox Cluster</h3>
                  <p className="text-slate-400">Enterprise Virtualization Platform</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {infraStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4"
                  >
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}>
                      <stat.icon className="size-5 text-white" />
                    </div>
                    <div className="text-2xl mb-1 text-white">{stat.value}</div>
                    <div className="text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Network Topology Visualization */}
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/30">
                <h4 className="text-white mb-6 flex items-center gap-2">
                  <Network className="size-5" />
                  Network Architecture
                </h4>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  {/* Internet */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-2">
                      <Network className="size-8 text-white" />
                    </div>
                    <span className="text-slate-300">Internet</span>
                  </motion.div>

                  <div className="h-px w-16 bg-gradient-to-r from-blue-500 to-purple-500 hidden md:block" />

                  {/* Firewall */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-2">
                      <Shield className="size-8 text-white" />
                    </div>
                    <span className="text-slate-300">Firewall/WAF</span>
                  </motion.div>

                  <div className="h-px w-16 bg-gradient-to-r from-orange-500 to-red-500 hidden md:block" />

                  {/* Proxmox */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-2">
                      <Server className="size-8 text-white" />
                    </div>
                    <span className="text-slate-300">Proxmox VE</span>
                  </motion.div>

                  <div className="h-px w-16 bg-gradient-to-r from-green-500 to-teal-500 hidden md:block" />

                  {/* Services */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-2">
                      <Activity className="size-8 text-white" />
                    </div>
                    <span className="text-slate-300">Services</span>
                  </motion.div>
                </div>
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
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8">
            <h3 className="text-2xl mb-6 text-white flex items-center gap-2">
              <Shield className="size-6" />
              Security Layers
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityLayers.map((layer, index) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white">{layer.name}</h4>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-400">{layer.status}</span>
                    </div>
                  </div>
                  <p className="text-slate-400">{layer.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
