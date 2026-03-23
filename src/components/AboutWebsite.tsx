import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Server, Rocket, Cpu, Globe } from "lucide-react";

export function AboutWebsite({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🏗️ Portfolio Architecture & Security
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          <p className="text-lg leading-relaxed text-slate-400">
            This website isn't simply hosted on a traditional platform; it relies on a self-hosted 
            infrastructure designed for both performance and maximum security.
          </p>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Globe className="size-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">🛡️ Networking & Security: Cloudflare Zero Trust</h3>
            </div>
            <div className="pl-11 space-y-3">
              <p className="text-slate-400">
                Rather than opening ports on my home router (which is dangerous), I use a <strong>Cloudflare Tunnel (Argo)</strong>.
              </p>
              <ul className="list-disc list-outside space-y-2 text-slate-400 ml-4">
                <li><span className="text-slate-200 font-medium">The Concept:</span> My local server (Mac Mini) initiates a secure outbound connection to Cloudflare's edge network.</li>
                <li><span className="text-slate-200 font-medium">Zero Public IP:</span> My personal IP address remains completely hidden. The outside world only sees Cloudflare, which acts as a shield (WAF - Web Application Firewall) against DDoS attacks and common web injections.</li>
                <li><span className="text-slate-200 font-medium">Flexible SSL/TLS:</span> Traffic is encrypted end-to-end. Cloudflare handles the SSL certificates, ensuring a secure connection for all users without exposing my local network.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Rocket className="size-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">🚀 Deployment & Management: Coolify</h3>
            </div>
            <div className="pl-11 space-y-3">
              <p className="text-slate-400">
                For the software layer, I use <strong>Coolify</strong>—an open-source self-hosted alternative to Heroku/Vercel—running on my own hardware.
              </p>
              <ul className="list-disc list-outside space-y-2 text-slate-400 ml-4">
                <li><span className="text-slate-200 font-medium">Docker Engine:</span> Every service (Next.js Portfolio, Java APIs, Databases) runs within its own isolated container. This ensures that a failure in one application doesn't affect the others.</li>
                <li><span className="text-slate-200 font-medium">Automated CI/CD:</span> Whenever I push code to GitHub, Coolify detects the change, builds the Docker image, and redeploys the site automatically.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Cpu className="size-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">💻 Hardware: The "Home Lab"</h3>
            </div>
            <div className="pl-11 space-y-3">
              <p className="text-slate-400">
                The site is powered by a <strong>Mac Mini repurposed as a server</strong> under Proxmox (a virtualization hypervisor).
              </p>
              <ul className="list-disc list-outside space-y-2 text-slate-400 ml-4">
                <li><span className="text-slate-200 font-medium">Virtualization:</span> The portfolio runs in a dedicated Linux (Debian) VM, isolated from the rest of my home network to prevent lateral movement in case of a breach.</li>
                <li><span className="text-slate-200 font-medium">Performance:</span> By using local hardware, I maintain full control over resources (RAM, CPU) and ensure complete data privacy.</li>
              </ul>
            </div>
          </section>

          <div className="mt-8 pt-8 border-t border-slate-800">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Infrastructure Stack</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Hosting</div>
                <div className="text-sm font-medium text-slate-200">Proxmox</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Orchestration</div>
                <div className="text-sm font-medium text-slate-200">Coolify & Docker</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Tunneling</div>
                <div className="text-sm font-medium text-slate-200">Cloudflare</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Security</div>
                <div className="text-sm font-medium text-slate-200">WAF & SSL</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
