import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Choice = { id: string; label: string; emoji: string; response: React.ReactNode };
type MessageType = "text" | "typing" | "choices";
type Role = "max" | "user";

type Message = {
  id: string;
  role: Role;
  type: MessageType;
  text?: React.ReactNode;
  choices?: Choice[];
};

// ─── Config Data ─────────────────────────────────────────────────────────────
const CHOICES: Choice[] = [
  {
    id: "exp",
    label: "Who are you?",
    emoji: "",
    response: (
      <div className="flex flex-col gap-4">
        <span>The name is Maxime Zoppini. Here is my background:</span>
        <ul className="list-disc pl-4 m-0 space-y-3">
          <li><strong>Education:</strong> M.S. in Cybersecurity at CPE Lyon</li>
          <li><strong>Energy Pool (Lyon):</strong> Cybersecurity Analyst (Endpoint security, ISO 27001 & SIEM) & former Project Manager</li>
          <li><strong>AWS (Dublin):</strong> SDE Intern (IaC & TypeScript)</li>
          <li><strong>Previous:</strong> Web Dev at POWER (Lyon) & Pharmacie des Forestiers (Gabon)</li>
        </ul>
      </div>
    )
  },
  {
    id: "infra",
    label: "Your Infra stack?",
    emoji: "",
    response: (
      <div className="flex flex-col gap-4">
        <span>AWS (SES, CloudWatch, CDK), Infrastructure as Code (IaC), CI/CD Pipelines.</span>
        <ul className="list-disc pl-4 m-0 space-y-3">
          <li>Proxmox VE (Type-1 hypervisor, LXC + Docker)</li>
          <li>Cloudflare Zero Trust + Tunnel (secure exposure, no open ports)</li>
          <li>Traefik (Reverse proxy + automated TLS)</li>
          <li>Tailscale VPN (Secure admin access via WireGuard)</li>
          <li>Self-hosted deployment pipeline (Coolify + GitHub Actions webhooks)</li>
        </ul>
      </div>
    )
  },
  {
    id: "dev",
    label: "Your dev Stack?",
    emoji: "",
    response: (
      <div className="flex flex-col gap-4">
        <ul className="list-disc pl-4 m-0 space-y-3">
          <li><strong>Programming:</strong> Python, C, Java, PHP, C# (OOP), Bash, PowerShell, TypeScript</li>
          <li><strong>Spring Boot</strong> (Java backend, REST API, WebSockets STOMP)</li>
          <li><strong>Next.js / React</strong> (TypeScript, App Router)</li>
          <li><strong>LangChain4j + Ollama</strong> (Local embedded AI)</li>
          <li><strong>TarsosDSP</strong> (Audio processing)</li>
          <li><strong>Databases & Storage:</strong> PostgreSQL, MinIO (S3-compatible)</li>
        </ul>
      </div>
    )
  },
  {
    id: "sec",
    label: "What about security?",
    emoji: "",
    response: (
      <div className="flex flex-col gap-4">
        <ul className="list-disc pl-4 m-0 space-y-3">
          <li>SIEM Implementation & Monitoring</li>
          <li>IDS/IPS, Firewall design & implementation</li>
          <li>Ethical Hacking & CTFs</li>
          <li>OWASP & Web Application Security</li>
          <li>ISO 27001 & Security Policies (ANSSI, CNIL)</li>
          <li>NIS2 Awareness</li>
        </ul>
      </div>
    )
  },
  {
    id: "proj",
    label: "Your Projects?",
    emoji: "",
    response: (
      <div className="flex flex-col gap-4">
        <ul className="list-disc pl-4 m-0 space-y-3">
          <li>
            <a
              href="https://github.com/MaximeZoppini/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0A84FF", textDecoration: "underline", fontWeight: "bold" }}
            >
              This website
            </a>{" "}
            - Self-hosted on a Mac Mini (Proxmox). Stack: Docker, Coolify. Secured via Cloudflare Zero Trust Tunnel (no open ports).
          </li>
          <li>
            <a
              href="https://github.com/MaximeZpn/justmakeit-back"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0A84FF", textDecoration: "underline", fontWeight: "bold" }}
            >
              JustMakeIt
            </a>{" "}
            — Self-hosted collaborative DAW with local AI (Ollama + LangChain4j), real-time WebSockets, and full DevOps pipeline on Proxmox.
          </li>
        </ul>
      </div>
    )
  },
];

const SPRING = { type: "spring" as const, stiffness: 500, damping: 30 };

// ─── Subcomponents ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      className="flex items-center gap-[5px] px-4 py-3 rounded-2xl rounded-bl-none w-fit shadow-sm"
      style={{ background: "#262628" }}
      initial={{ opacity: 0, scale: 0.75, y: 12, originX: 0, originY: 1 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 8 }}
      transition={SPRING}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-[7px] h-[7px] rounded-full"
          style={{ background: "#8E8E93" }}
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}

function ReceivedBubble({ text }: { text: React.ReactNode }) {
  return (
    <motion.div
      className="flex items-end gap-2 w-full"
      initial={{ opacity: 0, scale: 0.75, y: 12, originX: 0, originY: 1 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={SPRING}
    >
      {/* Avatar */}
      <div
        className="flex items-center justify-center text-white shadow-md text-[10px]"
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          flexShrink: 0,
          background: "linear-gradient(135deg,#3b82f6,#7c3aed)",
          fontWeight: "bold"
        }}
      >
        M
      </div>
      <div
        className="rounded-2xl rounded-bl-none text-[15px] font-medium leading-snug shadow-sm"
        style={{
          background: "#262628",
          color: "#FFFFFF",
          padding: "9px 16px",
          maxWidth: "75%",
          fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

function SentBubble({ text }: { text: React.ReactNode }) {
  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, scale: 0.75, y: 12, originX: 1, originY: 1 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={SPRING}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%",
      }}
    >
      <div
        className="rounded-2xl rounded-br-none text-[15px] font-medium leading-snug text-white shadow-sm inline-block"
        style={{
          background: "linear-gradient(180deg,#007AFF 0%,#0055DB 100%)",
          padding: "9px 16px",
          maxWidth: "75%",
          fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

function ChoiceBubble({
  choice,
  onClick,
  delay = 0,
}: {
  choice: Choice;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      className="rounded-2xl rounded-br-none text-[15px] font-medium leading-snug text-white shadow-sm"
      style={{
        background: "linear-gradient(180deg,#007AFF 0%,#0055DB 100%)",
        fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif",
        padding: "9px 16px",
        maxWidth: "75%",
        originX: 1,
        originY: 1,
      }}
      initial={{ opacity: 0, scale: 0.75, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10, transition: { duration: 0.2 } }}
      transition={{ ...SPRING, delay }}
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
    >
      {choice.emoji}&nbsp;{choice.label}
    </motion.button>
  );
}

// ─── Main Interface ──────────────────────────────────────────────────────────

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "msg-init", role: "max", type: "text", text: "Wassup, you're in my Portfolio. What are u looking for?" },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const askedIdsRef = useRef<Set<string>>(new Set());

  // Initial choices appear slightly after greeting
  useEffect(() => {
    const t = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: "choices-init", role: "user", type: "choices", choices: CHOICES },
      ]);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    // A tiny delay ensures the DOM has rendered the new elements before scrolling
    const t = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [messages]);

  const handleChoiceClick = (choice: Choice) => {
    const timestamp = Date.now();
    askedIdsRef.current.add(choice.id);
    
    // 1. Remove choices, turn clicked choice into a user message, show Max typing
    setMessages((prev) => {
      const msgsWithoutChoices = prev.filter((m) => m.type !== "choices");
      return [
        ...msgsWithoutChoices,
        { id: `sent-${timestamp}`, role: "user", type: "text", text: `${choice.emoji ? choice.emoji + " " : ""}${choice.label}` },
        { id: `typing-${timestamp}`, role: "max", type: "typing" },
      ];
    });

    // 2. Resolve typing indicator (after ~800ms)
    setTimeout(() => {
      setMessages((prev) => {
        const msgsWithoutTyping = prev.filter((m) => m.type !== "typing");
        
        const nextMsgs: Message[] = [
          ...msgsWithoutTyping,
          { id: `resp-${timestamp}`, role: "max", type: "text", text: choice.response }
        ];
        
        const remainingChoices = CHOICES.filter(c => !askedIdsRef.current.has(c.id));
        if (remainingChoices.length > 0) {
          nextMsgs.push({ id: `choices-${timestamp}`, role: "user", type: "choices", choices: remainingChoices });
        }
        
        return nextMsgs;
      });
    }, 800);
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col" style={{ background: "#000000" }}>
      {/* ── iOS Header ── */}
      <div
        className="sticky top-0 z-20 flex flex-col items-center gap-1 py-5"
        style={{
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="flex items-center justify-center text-white shadow-lg"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            flexShrink: 0,
            background: "linear-gradient(135deg,#3b82f6,#7c3aed)",
            fontSize: "18px",
            fontWeight: "bold",
            lineHeight: 1
          }}
        >
          M
        </div>
        <p className="text-white text-[13px] font-semibold tracking-tight">Maxime Zoppini</p>
      </div>

      {/* ── Chat Flow ── */}
      <div
        className="flex-1 flex flex-col pt-6 pb-12 w-full"
        style={{ maxWidth: 560, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}
      >
        {/* Cloudflare Tunnel Encryption Tag */}
        <div className="flex justify-center items-center gap-1.5 mb-6 opacity-60">
          <Lock size={10} color="#8E8E93" strokeWidth={3} />
          <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "#8E8E93" }}>
            End-to-end encrypted via Cloudflare Tunnel
          </span>
        </div>

        {/* Date stamp */}
        <p
          className="text-center text-[11px] font-medium mb-4 uppercase tracking-wide"
          style={{ color: "#8E8E93" }}
        >
          Today
        </p>

        {/* Dynamic Messages Loop */}
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
              if (msg.type === "text") {
                return msg.role === "max" ? (
                  <ReceivedBubble key={msg.id} text={msg.text} />
                ) : (
                  <SentBubble key={msg.id} text={msg.text} />
                );
              }

              if (msg.type === "typing") {
                return (
                  <motion.div key={msg.id} className="flex items-end gap-2 w-full mt-4">
                    <div
                      className="flex items-center justify-center text-white text-[10px] shadow-md"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: "linear-gradient(135deg,#3b82f6,#7c3aed)",
                        fontWeight: "bold"
                      }}
                    >
                      M
                    </div>
                    <TypingIndicator />
                  </motion.div>
                );
              }

              if (msg.type === "choices" && msg.choices) {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 8,
                      marginTop: 16,
                      width: "100%",
                    }}
                  >
                    {msg.choices.map((c, i) => (
                      <ChoiceBubble
                        key={`${msg.id}-${c.id}`}
                        choice={c}
                        onClick={() => handleChoiceClick(c)}
                        delay={0.05 + i * 0.1}
                      />
                    ))}
                  </motion.div>
                );
              }

              return null;
            })}
          </AnimatePresence>
        </div>

        {/* Auto-scroll target */}
        <div ref={bottomRef} className="h-4 mt-8" />
      </div>
    </section>
  );
}
