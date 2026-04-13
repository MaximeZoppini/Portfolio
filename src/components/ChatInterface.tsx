import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, ArrowUp } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Choice = { id: string; label: string; emoji: string; response: React.ReactNode | React.ReactNode[] };
type MessageType = "text" | "typing" | "choices";
type Role = "max" | "user";

type Message = {
  id: string;
  role: Role;
  type: MessageType;
  text?: React.ReactNode;
  choices?: Choice[];
  layoutId?: string;
  isSpecialStyle?: boolean;
  isDustyPrototype?: boolean;
  yesLevel?: number;
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
        <span>Here's the technical backbone of my projects:</span>
        <ul className="list-disc pl-4 m-0 space-y-3">
          <li><strong>Cloud Ops:</strong> AWS (SES, CloudWatch, CDK), Infrastructure as Code (IaC)</li>
          <li><strong>Virtualization:</strong> Proxmox VE (Type-1 hypervisor, LXC + Docker)</li>
          <li><strong>Network security:</strong> Cloudflare Zero Trust, Tunnels & Traefik Reverse Proxy</li>
          <li><strong>Remote access:</strong> Tailscale VPN (WireGuard-based)</li>
          <li><strong>DevOps:</strong> CI/CD Pipelines with GitHub Actions & Coolify</li>
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
        <span>I build scalable and modern applications using:</span>
        <ul className="list-disc pl-4 m-0 space-y-3">
          <li><strong>Languages:</strong> TypeScript, Python, Java, PHP, C#, C, Bash, PowerShell</li>
          <li><strong>Backend:</strong> Spring Boot (REST API, WebSockets STOMP)</li>
          <li><strong>Frontend:</strong> Next.js / React (Modern App Router)</li>
          <li><strong>AI/ML:</strong> LangChain4j + Ollama (Local AI implementation)</li>
          <li><strong>Signal Processing:</strong> TarsosDSP (Audio processing)</li>
          <li><strong>Databases:</strong> PostgreSQL, Minio (S3 storage)</li>
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
        <span>Security is at the heart of my work:</span>
        <ul className="list-disc pl-4 m-0 space-y-3">
          <li><strong>Monitoring & Defense:</strong> SIEM Implementation, IDS/IPS & Firewall design</li>
          <li><strong>Offensive:</strong> Ethical Hacking, CTF competition player & OWASP best practices</li>
          <li><strong>Compliance:</strong> ISO 27001 implementation, ANSSI/CNIL Security Policies</li>
          <li><strong>Governance:</strong> NIS2 Awareness & Security Auditing</li>
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
              href="https://github.com/MaximeZoppini/justmakeit-back"
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
  {
    id: "format",
    label: "Why this format?",
    emoji: "",
    response: [
      <span>Well, I like making different stuff. Could'nt see myself making a regular ai-generated style portfolio with big beautiful colors just to show that I know C# or Java. Boring.</span>,
      <span>So, if you have any questions let me know, curiosity and engagement is <span style={{ color: "#FFD700", fontWeight: "bold", textShadow: "0 0 5px rgba(255,215,0,0.5)" }}>highly</span> rewarded here.</span>
    ]
  }
];

const SPRING = { type: "spring" as const, stiffness: 500, damping: 30 };

// ─── Subcomponents ───────────────────────────────────────────────────────────

const YES_EMOJIS = ["✅", "👍", "🔥", "🤯", " "];

function TypingIndicator() {
  return (
    <motion.div
      layout
      className="flex items-center px-4 py-3 rounded-2xl rounded-bl-none w-fit shadow-sm"
      style={{ background: "#262628", originY: 1, gap: "5px" }}
      initial={{ opacity: 0, scale: 0.8, y: 10, height: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, scale: 0.8, y: 10, height: 0 }}
      transition={SPRING}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#8E8E93", flexShrink: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.6,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
}

function ReceivedBubble({ 
  text, 
  isSpecialStyle, 
  isDustyPrototype,
  yesCount, 
  isInfected,
  isDraggingSpare,
  hasRestored,
  onStartDrag
}: { 
  text: React.ReactNode; 
  isSpecialStyle?: boolean;
  isDustyPrototype?: boolean;
  yesCount: number; 
  isInfected: boolean;
  isDraggingSpare?: boolean;
  hasRestored?: boolean;
  onStartDrag?: () => void;
}) {
  const isYes = typeof text === "string" && (text.toLowerCase() === "yes" || isInfected);
  const isYellow = (isYes && yesCount >= 3) || isInfected;

  return (
    <motion.div
      layout
      className="flex items-end gap-2 w-full mt-4 justify-start"
      style={{ originX: 0, originY: 1 }}
      initial={{ opacity: 0, scale: 0.8, y: 10, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, height: "auto", marginTop: 16 }}
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
        {isInfected ? "Y" : "M"}
      </div>
      <div
        className={`rounded-2xl rounded-bl-none text-[15px] font-medium leading-snug shadow-sm ${isSpecialStyle || isDustyPrototype ? "reward-message" : ""}`}
        style={{
          background: isYellow ? "#2d2a00" : (isSpecialStyle || isDustyPrototype ? "#3d3215" : "#262628"),
          color: isYellow ? "#FFD60A" : (isSpecialStyle || isDustyPrototype ? "#FFD700" : "#FFFFFF"),
          padding: "9px 16px",
          maxWidth: "75%",
          fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif",
          border: isYellow ? "1px solid rgba(255, 214, 10, 0.5)" : (isSpecialStyle || isDustyPrototype ? "1px solid rgba(255, 215, 0, 0.4)" : "none"),
          boxShadow: isYellow ? "0 0 20px rgba(255, 214, 10, 0.15)" : "none",
          textShadow: isYellow ? "0 0 8px rgba(255, 214, 10, 0.3)" : "none"
        }}
      >
        {isDustyPrototype ? (
          <div className="flex flex-col gap-3 items-center py-2">
            <span>Found it, here you go.</span>
            <span>This was a prototype, besides the dust it should work just fine.</span>
            
            {!isDraggingSpare && !hasRestored && (
              <div className="flex flex-col gap-3 items-center w-full">
                <div className="w-[50px] h-[30px] flex items-center justify-center relative">
                  <motion.div
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      if (onStartDrag) onStartDrag();
                    }}
                    layoutId="spare-button-source"
                    style={{ 
                      width: "50px",
                      height: "30px",
                      borderRadius: "15px",
                      background: "linear-gradient(135deg, #0A84FF 0%, #0055DB 100%)",
                      border: "2px solid rgba(142, 142, 147, 0.4)",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      cursor: "grab"
                    }}
                  >
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "15px",
                      background: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(128,128,128,0.2) 0%, transparent 50%)",
                      pointerEvents: "none"
                    }} />
                    <ArrowUp size={20} color="#FFFFFF" strokeWidth={3} />
                  </motion.div>
                </div>
                <span className="text-[11px] opacity-70 font-semibold uppercase tracking-wider">
                  Dusty Prototype Button
                </span>
              </div>
            )}
          </div>
        ) : text}
      </div>
    </motion.div>
  );
}

function SentBubble({ text, layoutId, yesCount, isInfected }: { text: React.ReactNode; layoutId?: string, yesCount: number, isInfected: boolean }) {
  const isYes = typeof text === "string" && (text.toLowerCase() === "yes" || isInfected);
  const isYellow = (isYes && yesCount >= 3) || isInfected;

  return (
    <motion.div
      layout
      layoutId={layoutId}
      className="mt-4 flex justify-end w-full"
      style={{ originX: 1, originY: 1, width: "100%", display: "flex", justifyContent: "flex-end" }}
      initial={{ opacity: 0, scale: 0.8, y: 10, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, height: "auto", marginTop: 16 }}
      transition={SPRING}
    >
      <div
        className="rounded-2xl rounded-br-none text-[15px] font-medium leading-snug text-white shadow-sm"
        style={{
          background: isYellow ? "#2d2a00" : "linear-gradient(180deg,#007AFF 0%,#0055DB 100%)",
          color: isYellow ? "#FFD60A" : "#FFFFFF",
          padding: "9px 16px",
          maxWidth: "75%",
          width: "fit-content",
          fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif",
          border: isYellow ? "1px solid rgba(255, 214, 10, 0.5)" : "none",
          boxShadow: isYellow ? "0 0 20px rgba(255, 214, 10, 0.15)" : "none",
          textShadow: isYellow ? "0 0 8px rgba(255, 214, 10, 0.3)" : "none",
          marginLeft: "auto"
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
      layout
      layoutId={`choice-bubble-${choice.id}`}
      className="rounded-2xl rounded-br-none text-[15px] font-medium leading-snug text-white shadow-sm"
      style={{
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

const INTRO_MESSAGES = [
  "Wassup, you're in my Portfolio. What are u looking for?",
  "Welcome to my Portfolio. Need anything?",
  "Hey there! Feel free to ask me anything about my profile, background,...",
  "Hello! Welcome to my home. I mean, if we can call it a home. Let's say a virtual home. How can I help you today?"
];

// ─── Main Interface ──────────────────────────────────────────────────────────

export function ChatInterface({ isInfected, onInfect }: { isInfected: boolean, onInfect: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const askedIdsRef = useRef<Set<string>>(new Set());
  const slotRef = useRef<HTMLDivElement>(null);
  const yesTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isDraggingSpare, setIsDraggingSpare] = useState(false);
  
  // Input State
  const [inputValue, setInputValue] = useState("");
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [completedEasterEggs, setCompletedEasterEggs] = useState<Set<string>>(new Set());
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(true);
  const [baseScale, setBaseScale] = useState(1);
  const [bulgeTrigger, setBulgeTrigger] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [hasRestored, setHasRestored] = useState(false);
  const [isGhosting, setIsGhosting] = useState(false);
  const [waitingForSure, setWaitingForSure] = useState(false);
  const [trollCount, setTrollCount] = useState(0);
  const [protoTrollCount, setProtoTrollCount] = useState(0);
  const [isPermanentlyBroken, setIsPermanentlyBroken] = useState(false);
  const [yesCount, setYesCount] = useState(0);
  
  // Available Choices
  const availableChoices = CHOICES.filter(c => !askedIdsRef.current.has(c.id));
  
  // Validation
  const textToMatch = inputValue.trim().toLowerCase();
  const matchedChoice = CHOICES.find(c => 
    !completedEasterEggs.has(c.id) &&
    (c.label.toLowerCase() === textToMatch || 
    `${c.emoji} ${c.label}`.trim().toLowerCase() === textToMatch)
  );

  const isFirstInteraction = askedIdsRef.current.size === 0 && !messages.some(m => m.role === "user");

  const isSpecialCmd = 
    (isFirstInteraction && (textToMatch === "no" || textToMatch === "yes")) || 
    (waitingForSure && (textToMatch === "yes" || textToMatch === "no")) ||
    ((isInfected || yesCount > 0) && textToMatch === "yes") ||
    (trollCount === 1 && textToMatch === "no");

  const isValidChoice = (!!matchedChoice || isSpecialCmd) && !isGhosting;
  
  // Autocomplete Filter for display
  const filteredChoices = (textToMatch === "" || isGhosting || waitingForSure || isInfected || yesCount > 0)
    ? (isGhosting || waitingForSure ? [] : (isInfected || yesCount > 0 ? [{ id: "yes-inf", label: "Yes", emoji: YES_EMOJIS[Math.min(yesCount, YES_EMOJIS.length - 1)] }] : (trollCount > 0 ? [] : availableChoices)))
    : CHOICES.filter(c => !completedEasterEggs.has(c.id) && c.label.toLowerCase().includes(textToMatch));

  // Animation de lancement
  useEffect(() => {
    // T = 500ms : Apparition de la bulle d'attente (typing)
    const t1 = setTimeout(() => {
      setMessages([{ id: "typing-init", role: "max", type: "typing" }]);
    }, 500);

    // T = 2000ms : Affichage du message de bienvenue (1.5s de frappe)
    const randomIntro = INTRO_MESSAGES[Math.floor(Math.random() * INTRO_MESSAGES.length)];
    const t2 = setTimeout(() => {
      setMessages([
        { id: "msg-init", role: "max", type: "text", text: randomIntro }
      ]);
      setTimeout(() => setIsWaitingForResponse(false), 1000);
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);



  // Removed manual scroll-to-bottom! We will use flex-col-reverse to natively anchor to bottom.
  // This solves ALL Framer Motion layout teleportation bugs caused by scroll jumping.

  const handleChoiceClick = (choice: Choice) => {
    if (isWaitingForResponse || isGhosting || isExploded) return;
    
    // Clear yes infection timer if user chooses a real question
    if (yesTimerRef.current) {
      clearTimeout(yesTimerRef.current);
      yesTimerRef.current = null;
      setYesCount(0);
    }
    
    setIsWaitingForResponse(true);
    const timestamp = Date.now();
    askedIdsRef.current.add(choice.id);
    
    // Seul le choix "Who are you?" ("exp") a le droit d'être reposé plusieurs fois.
    if (choice.id !== "exp") {
      setCompletedEasterEggs(prev => new Set(prev).add(choice.id));
    }
    
    // Reset balloon scale
    setBaseScale(1);
    setBulgeTrigger(0);
    
    // ETAPE 1 : Le message s'envoie
    setMessages((prev) => {
      return [
        ...prev,
        { id: `sent-${timestamp}`, role: "user", type: "text", text: `${choice.emoji ? choice.emoji + " " : ""}${choice.label}` }
      ];
    });

    // ETAPE 2 : On attend un instant (le temps que le message glisse/s'affiche)
    setTimeout(() => {
      // Affichage de la bulle "en train d'écrire"
      setMessages((prev) => [
        ...prev,
        { id: `typing-${timestamp}`, role: "max", type: "typing" }
      ]);
      
      // ETAPE 3 : On patiente exactement 1 seconde avant d'afficher la réponse de Max
      setTimeout(() => {
        if (Array.isArray(choice.response)) {
          // Premier message avec bulle de frappe pour le suivant
          setMessages((prev) => {
            const msgsWithoutTyping = prev.filter((m) => m.type !== "typing");
            return [
              ...msgsWithoutTyping,
              { id: `resp-${timestamp}-0`, role: "max", type: "text", text: choice.response[0] },
              { id: `typing-${timestamp}-1`, role: "max", type: "typing" }
            ];
          });
          
          // Séquençage des messages suivants
          choice.response.slice(1).forEach((respPart, idx) => {
            const isLast = idx === choice.response.length - 2;
            setTimeout(() => {
              setMessages((prev) => {
                const msgsWithoutTyping = prev.filter((m) => m.type !== "typing");
                const nextMsgs: Message[] = [
                  ...msgsWithoutTyping,
                  { id: `resp-${timestamp}-${idx + 1}`, role: "max", type: "text", text: respPart }
                ];
                if (!isLast) {
                  nextMsgs.push({ id: `typing-${timestamp}-${idx + 2}`, role: "max", type: "typing" });
                }
                return nextMsgs;
              });
              
              if (isLast) {
                setTimeout(() => setIsWaitingForResponse(false), 1000);
              }
            }, (idx + 1) * 2000); // 2 secondes de typing par nouveau message
          });
        } else {
          setMessages((prev) => {
            const msgsWithoutTyping = prev.filter((m) => m.type !== "typing");
            return [
              ...msgsWithoutTyping,
              { id: `resp-${timestamp}`, role: "max", type: "text", text: choice.response }
            ];
          });
          setTimeout(() => setIsWaitingForResponse(false), 1000);
        }
      }, 1000); // 1 seconde de typing initiale
    }, 1450); // Attend 1 seconde extra + 450ms d'animation d'envoi avant que Maxime ne commence à écrire
  };

  const handleCustomSend = () => {
    if (!isValidChoice || isGhosting || isWaitingForResponse || isExploded) return;
    
    // Clear yes infection timer if user types something else (though validation usually stops this)
    if (textToMatch !== "yes" && yesTimerRef.current) {
      clearTimeout(yesTimerRef.current);
      yesTimerRef.current = null;
      setYesCount(0);
    }

    setIsWaitingForResponse(true);

    // 1. Specialty Phase: Follow-ups to "Are you sure?"
    if (waitingForSure) {
      if (textToMatch === "yes") {
        const timestamp = Date.now();
        setMessages(prev => [...prev, { id: `sent-${timestamp}`, role: "user", type: "text", text: "yes" }]);
        setWaitingForSure(false);

        const runGhosting = async () => {
          const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
          await wait(1000);
          
          // Step 1: damn
          setMessages(prev => [...prev, { id: `ghosting-typing-damn`, role: "max", type: "typing" }]);
          await wait(2000);
          setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `ghost-msg-damn`, role: "max", type: "text", text: "damn" }]);
          
          // Step 2: suspense (3s)
          await wait(3000);
          
          // Step 3: cookeddog.png
          setMessages(prev => [...prev, { id: `ghosting-typing-img`, role: "max", type: "typing" }]);
          await wait(2500);
          setMessages(prev => [
            ...prev.filter(m => m.type !== "typing"), 
            { 
              id: `ghost-msg-img`, 
              role: "max", 
              type: "text", 
              text: (
                <div className="py-1">
                  <img 
                    src="/cookedDog.png" 
                    alt="Cooked Dog" 
                    className="rounded-lg shadow-md max-w-full h-auto"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
              )
            }
          ]);

          // Step 4: final words
          await wait(2000);
          setMessages(prev => [...prev, { id: `ghosting-typing-1`, role: "max", type: "typing" }]);
          await wait(2500);
          setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `ghost-msg-1`, role: "max", type: "text", text: "well apreciate it. have a good one." }]);
          
          await wait(5000);
          
          setMessages(prev => [...prev, { id: `ghosting-typing-2`, role: "max", type: "typing" }]);
          await wait(3000);
          setMessages(prev => [
            ...prev.filter(m => m.type !== "typing"), 
            { id: `ghost-msg-2`, role: "max", type: "text", text: "why are you still here? reload the page or something. on this instance i won't answer anything else anymore." }
          ]);
          
          setIsGhosting(true);
          setIsWaitingForResponse(false);
        };

        runGhosting();
        setInputValue("");
        return;
      }

      if (textToMatch === "no") {
        const timestamp = Date.now();
        setMessages(prev => [...prev, { id: `sent-${timestamp}`, role: "user", type: "text", text: "no" }]);
        setWaitingForSure(false);

        setTimeout(() => {
          setMessages(prev => [...prev, { id: `typing-no-back`, role: "max", type: "typing" }]);
          setTimeout(() => {
            setMessages(prev => [
              ...prev.filter(m => m.type !== "typing"),
              { id: `resp-no-back`, role: "max", type: "text", text: "aight, i don't know what to tell you about that reaction, but yeah no need for rudeness. whatever, need something?" }
            ]);
            setTrollCount(1);
            setIsWaitingForResponse(false);
          }, 2000);
        }, 1000);
        setInputValue("");
        return;
      }
    }
    
    // 2. Secret Path: Initiating "no"
    if (textToMatch === "no") {
      const timestamp = Date.now();
      setMessages(prev => [...prev, { id: `sent-${timestamp}`, role: "user", type: "text", text: "no" }]);
      
      if (trollCount === 0) {
        // Chemin 1 : Are you sure?
        setTimeout(() => {
          setMessages(prev => [...prev, { id: `typing-${timestamp}`, role: "max", type: "typing" }]);
          setTimeout(() => {
            setMessages(prev => [
              ...prev.filter(m => m.type !== "typing"),
              { id: `resp-${timestamp}`, role: "max", type: "text", text: "oh well. th'ats a bit rude. are you sure?" }
            ]);
            setWaitingForSure(true);
            setIsWaitingForResponse(false);
          }, 1500);
        }, 1000);
      } else {
        // Chemin 2 : Troll détecté, Ghosting final
        const runTrollExit = async () => {
          const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
          await wait(1000);
          setMessages(prev => [...prev, { id: `troll-typing-1`, role: "max", type: "typing" }]);
          await wait(2500);
          setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `troll-msg-1`, role: "max", type: "text", text: "are you pushing me off my limit or something? i'm usually a chill guy, but if you disrespect i'll cut it short." }]);
          
          setMessages(prev => [...prev, { id: `troll-typing-2`, role: "max", type: "typing" }]);
          await wait(3000);
          setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `troll-msg-2`, role: "max", type: "text", text: "you could enjoy life instead of trolling around here you know that?" }]);
          
          setMessages(prev => [...prev, { id: `troll-typing-3`, role: "max", type: "typing" }]);
          await wait(2000);
          setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `troll-msg-3`, role: "max", type: "text", text: "whatever. i'm out." }]);
          
          setIsGhosting(true);
          setIsWaitingForResponse(false);
        };
        runTrollExit();
      }
      setInputValue("");
      return;
    }

    // Handle "yes" secret path (Infection)
    if (textToMatch === "yes" && !waitingForSure) {
      const timestamp = Date.now();
      const nextYesCount = yesCount + 1;

      setMessages(prev => [...prev, { 
        id: `sent-yes-${timestamp}`, 
        role: "user", 
        type: "text", 
        text: "yes", 
        yesLevel: nextYesCount 
      }]);
      setInputValue("");
      
      setYesCount(nextYesCount);

      if (nextYesCount >= 5) {
        onInfect();
        setShowBigYes(true);
        // Staggered rewrite effect for existing messages
        const rewriteAll = async () => {
          setMessages(prev => {
            const count = prev.length;
            for (let i = 0; i < count; i++) {
              setTimeout(() => {
                setMessages(current => {
                  const copy = [...current];
                  if (copy[i] && copy[i].type === "text" && copy[i].text !== "yes") {
                    copy[i] = { ...copy[i], text: "yes" };
                  }
                  return copy;
                });
              }, i * 150);
            }
            return prev;
          });
        };
        
        rewriteAll();
        setIsWaitingForResponse(false);
        return;
      }

      // Delay logic: 10s for first, then much faster (2s)
      const delay = nextYesCount === 1 ? 10000 : 2000;
      
      yesTimerRef.current = setTimeout(() => {
        setMessages(prev => [...prev, { id: `yes-typing-${timestamp}`, role: "max", type: "typing" }]);
        setTimeout(() => {
          setMessages(prev => [
            ...prev.filter(m => m.type !== "typing"),
            { id: `yes-resp-${timestamp}`, role: "max", type: "text", text: "yes" }
          ]);
          setIsWaitingForResponse(false);
          yesTimerRef.current = null;
        }, 1500);
      }, delay);
      return;
    }

    if (!matchedChoice) return;
    setIsWaitingForResponse(true);
    
    // Reset balloon scale
    setBaseScale(1);
    setBulgeTrigger(0);
    
    if (askedIdsRef.current.has(matchedChoice.id)) {
      // L'utilisateur renvoie une question déjà posée
      const timestamp = Date.now();
      const currentDup = duplicateCount;
      setDuplicateCount(prev => prev + 1);
      
      setMessages(prev => [
        ...prev,
        { id: `sent-${timestamp}`, role: "user", type: "text", text: `${matchedChoice.emoji ? matchedChoice.emoji + " " : ""}${matchedChoice.label}` }
      ]);
      
      if (currentDup === 0) {
        setTimeout(() => {
          setMessages(prev => [...prev, { id: `typing-${timestamp}`, role: "max", type: "typing" }]);
          setTimeout(() => {
            setMessages(prev => {
              const msgsWithoutTyping = prev.filter(m => m.type !== "typing");
              return [
                ...msgsWithoutTyping,
                { id: `resp-${timestamp}`, role: "max", type: "text", text: "Hey... already answered this one." }
              ];
            });
            setTimeout(() => setIsWaitingForResponse(false), 1000);
          }, 1000);
        }, 1450);
      } else if (currentDup === 1) {
        setTimeout(() => {
          setMessages(prev => [...prev, { id: `typing-${timestamp}`, role: "max", type: "typing" }]);
          setTimeout(() => {
            setMessages(prev => {
              const msgsWithoutTyping = prev.filter(m => m.type !== "typing");
              return [
                ...msgsWithoutTyping,
                { id: `resp-${timestamp}`, role: "max", type: "text", text: "..." }
              ];
            });
            setTimeout(() => setIsWaitingForResponse(false), 1000);
          }, 1500);
        }, 1450);
      } else {
        setCompletedEasterEggs(prev => new Set(prev).add(matchedChoice.id));
        setTimeout(() => {
          setMessages(prev => [...prev, { id: `typing-${timestamp}-1`, role: "max", type: "typing" }]);
          setTimeout(() => {
            setMessages(prev => {
              const msgsWithoutTyping = prev.filter(m => m.type !== "typing");
              return [
                ...msgsWithoutTyping,
                { id: `resp-${timestamp}-1`, role: "max", type: "text", isSpecialStyle: true, text: "Okay. let me think about this one...." },
                { id: `typing-${timestamp}-2`, role: "max", type: "typing" }
              ];
            });
            
            setTimeout(() => {
              setMessages(prev => {
                const msgsWithoutTyping = prev.filter(m => m.type !== "typing");
                return [
                  ...msgsWithoutTyping,
                  { id: `resp-${timestamp}-2`, role: "max", type: "text", text: "Well, i believe identity evolves over time." },
                  { id: `typing-${timestamp}-3`, role: "max", type: "typing" }
                ];
              });
              
              setTimeout(() => {
                setMessages(prev => {
                  const msgsWithoutTyping = prev.filter(m => m.type !== "typing");
                  return [
                    ...msgsWithoutTyping,
                    { id: `resp-${timestamp}-3`, role: "max", type: "text", text: "First thing first, i focus a lot into making sure this identity evolves postively over time." },
                    { id: `typing-${timestamp}-4`, role: "max", type: "typing" }
                  ];
                });

                setTimeout(() => {
                  setMessages(prev => {
                    const msgsWithoutTyping = prev.filter(m => m.type !== "typing");
                    return [
                      ...msgsWithoutTyping,
                      { id: `resp-${timestamp}-4`, role: "max", type: "text", text: "So, last time i worked on this project, i was a student, curious about tech in general, infra, dev, cyber, AI, even quantum, trying to figure out what's going on out here." },
                      { id: `typing-${timestamp}-5`, role: "max", type: "typing" }
                    ];
                  });

                  setTimeout(() => {
                    setMessages(prev => {
                      const msgsWithoutTyping = prev.filter(m => m.type !== "typing");
                      return [
                        ...msgsWithoutTyping,
                        { id: `resp-${timestamp}-5`, role: "max", type: "text", text: "With all the AI stuff going around, it's a bit concerning, but i focus mainly on doing my best with what i have, and i know i need to work on something that makes sense for me." }
                      ];
                    });
                    setTimeout(() => setIsWaitingForResponse(false), 1000);
                  }, 3000);
                }, 3500);
              }, 2000);
            }, 3000);
          }, 1800);
        }, 1450);
      }
    } else {
      // Nouvelle question
      handleChoiceClick(matchedChoice);
    }
    
    setInputValue("");
  };

  // ─── Global Key Listener (Enter to Send) ───────────────────────────────────
  useEffect(() => {
    const onKeyEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        // Only trigger if we're not already waiting or ghosted
        if (!isWaitingForResponse && !isGhosting && isValidChoice) {
          e.preventDefault();
          handleCustomSend();
        }
      }
    };
    window.addEventListener("keydown", onKeyEnter);
    return () => window.removeEventListener("keydown", onKeyEnter);
  }, [handleCustomSend, isWaitingForResponse, isGhosting, isValidChoice]);

  // ─── Explosion Script ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isExploded) return;

    setIsWaitingForResponse(true);

    if (isPermanentlyBroken) {
      const runFinalBreakdown = async () => {
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await wait(1000);
        
        // 1. Aight kid...
        setMessages(prev => [...prev, { id: `final-break-typing-1`, role: "max", type: "typing" }]);
        await wait(2000);
        setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `final-break-1`, role: "max", type: "text", text: "Aight kid, i don't have any buttons left." }]);
        
        await wait(5000);
        
        // 2. Feeling dumb...
        setMessages(prev => [...prev, { id: `final-break-typing-2`, role: "max", type: "typing" }]);
        await wait(2500);
        setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `final-break-2`, role: "max", type: "text", text: "Feeling dumb or what?" }]);
        
        await wait(3000);
        
        // 3. Reload...
        setMessages(prev => [...prev, { id: `final-break-typing-3`, role: "max", type: "typing" }]);
        await wait(3500);
        setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `final-break-3`, role: "max", type: "text", text: "Reload the page, we can't do this anymore..." }]);
        
        setIsWaitingForResponse(false);
      };
      runFinalBreakdown();
      return;
    }
    const timestamp = Date.now();

    // Sequence timer management
    const runSequence = async () => {
      setIsWaitingForResponse(true);
      const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      await wait(1500); // Let explosion finish

      // 1. oh crap
      setMessages(prev => [...prev, { id: `exp-typing-1`, role: "max", type: "typing" }]);
      await wait(2000);
      setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `exp-msg-1`, role: "max", type: "text", text: "oh, crap." }]);
      
      // 2. the suggestion is supposed to...
      setMessages(prev => [...prev, { id: `exp-typing-2`, role: "max", type: "typing" }]);
      await wait(3500);
      setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `exp-msg-2`, role: "max", type: "text", text: "the suggestion is supposed to fill the placeholder of the question you want to ask. After that you have to click the send button" }]);

      // 3. seems like you inflated it...
      setMessages(prev => [...prev, { id: `exp-typing-3`, role: "max", type: "typing" }]);
      await wait(3000);
      setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `exp-msg-3`, role: "max", type: "text", text: "seems like you inflated it or something, didn't knew it was behaving like a balloon all this time." }]);

      // 4. let me search...
      setMessages(prev => [...prev, { id: `exp-typing-4`, role: "max", type: "typing" }]);
      await wait(2500);
      setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `exp-msg-4`, role: "max", type: "text", text: "let me search if i have a spare button, i'm always prepared for things like this... " }]);

      // 5. Long wait (5s)
      await wait(5000);

      // 6. Final typing (4s)
      setMessages(prev => [...prev, { id: `exp-typing-5`, role: "max", type: "typing" }]);
      await wait(4000);
      
      // 7. Spare button message
      setMessages(prev => [
        ...prev.filter(m => m.type !== "typing"), 
        { 
          id: `exp-msg-5`, 
          role: "max", 
          type: "text", 
          isDustyPrototype: true,
          text: "" // Content handled by isDustyPrototype in ReceivedBubble
        }
      ]);
      
      setIsWaitingForResponse(false);
    };

    runSequence();
  }, [isExploded]);

  return (
    <section 
      className="relative" 
      style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#000000" }}
    >
      {/* ── iOS Header ── */}
      <div
        className="z-20 py-5"
        style={{
          flexShrink: 0,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
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
            {isInfected ? "Y" : "M"}
          </div>
          <p className="text-white text-[13px] font-semibold tracking-tight">{isInfected ? "Yes" : "Maxime Zoppini"}</p>
        
        {/* Cloudflare Tunnel Encryption Tag */}
        <div className="responsive-encryption-container">
          <Lock className="responsive-lock" color="#8E8E93" strokeWidth={3} />
          <span className="responsive-encryption-text">
            End-to-end encrypted via Cloudflare Tunnel
          </span>
        </div>
      </div>

      {/* ── Chat Flow ── */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
          }
          
          /* Responsive Elements */
          .responsive-encryption-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
            margin-top: 8px;
            opacity: 0.6;
            text-align: center;
            padding: 0 10px;
          }
          .responsive-encryption-text {
            color: #8E8E93;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 600;
            line-height: 1.2;
            font-size: 10px;
          }
          .responsive-date-stamp {
            color: #8E8E93;
            text-align: center;
            font-weight: 500;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            font-size: 11px;
          }
          .responsive-lock {
            width: 10px;
            height: 10px;
          }
          
          @media (max-width: 480px) {
            .responsive-encryption-text {
              font-size: 7.5px;
            }
            .responsive-date-stamp {
              font-size: 9px;
            }
            .responsive-lock {
              width: 8px;
              height: 8px;
            }
            .responsive-encryption-container {
              gap: 4px;
            }
          }

          @keyframes glowPlaceholder {
            0% { opacity: 0.5; text-shadow: 0 0 2px rgba(255,255,255,0); }
            50% { opacity: 1; text-shadow: 0 0 8px rgba(255,255,255,0.7); color: #fff; }
            100% { opacity: 0.5; text-shadow: 0 0 2px rgba(255,255,255,0); }
          }
          .shimmering-input::placeholder {
            animation: glowPlaceholder 2s ease-in-out infinite;
            color: rgba(255,255,255,0.7);
            font-weight: 500;
            transition: all 0.3s ease;
          }

          /* Hide scrollbar for chips */
          .chips-container {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .chips-container::-webkit-scrollbar {
            display: none;
          }

          /* Easter Egg Final Reward */
          @keyframes slowBlinkGold {
            0%, 100% { opacity: 0.6; box-shadow: 0 0 2px rgba(255,215,0,0); border-color: rgba(255,255,255,0.12); }
            50% { opacity: 1; box-shadow: 0 0 12px rgba(255,215,0,0.6); border-color: rgba(255,215,0,0.8); color: #FFD700; background: rgba(255,215,0,0.1); }
          }
          .reward-chip {
            animation: slowBlinkGold 2s ease-in-out infinite !important;
          }
          @keyframes starAura {
            0%, 100% { box-shadow: 0 0 10px rgba(255,215,0,0.2), inset 0 0 10px rgba(255,215,0,0.1); }
            50% { box-shadow: 0 0 25px rgba(255,215,0,0.5), inset 0 0 15px rgba(255,215,0,0.2); }
          }
          .reward-message {
            animation: starAura 3s ease-in-out infinite;
          }

          /* Send Button Ripple */
          @keyframes rippleBlue {
            0% { box-shadow: 0 0 0 0 rgba(10, 132, 255, 0.6); }
            70% { box-shadow: 0 0 0 10px rgba(10, 132, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(10, 132, 255, 0); }
          }
          .send-button-ready {
            animation: rippleBlue 2s infinite;
          }

          /* Shrapnel / Explosion */
          @keyframes shrapnelPop {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(4); opacity: 0; filter: blur(10px); }
          }
          .shrapnel {
            position: absolute;
            background: #0A84FF;
            border-radius: 50%;
            pointer-events: none;
            animation: shrapnelPop 0.6s ease-out forwards;
          }
        `}
      </style>
      <div
        className="w-full pb-12 custom-scrollbar"
        style={{ 
          flex: 1, overflowY: "auto", display: "flex", flexDirection: "column-reverse",
          maxWidth: 560, margin: "0 auto", paddingLeft: 20, paddingRight: 20 
        }}
      >
        <div className="flex gap-2 w-full" style={{ flexDirection: "column-reverse" }}>
          <AnimatePresence initial={false}>
            {[...messages].reverse().map((msg, index) => {
              if (msg.type === "text") {
                return msg.role === "max" ? (
                  <ReceivedBubble 
                    key={msg.id} 
                    text={msg.text} 
                    isSpecialStyle={msg.isSpecialStyle} 
                    isDustyPrototype={msg.isDustyPrototype} 
                    yesCount={yesCount} 
                    isInfected={isInfected}
                    isDraggingSpare={isDraggingSpare}
                    hasRestored={hasRestored}
                    onStartDrag={() => {
                      if (!hasRestored && !isDraggingSpare) setIsDraggingSpare(true);
                    }}
                  />
                ) : (
                  <SentBubble key={msg.id} text={msg.text} layoutId={msg.layoutId} yesCount={yesCount} isInfected={isInfected} />
                );
              }

              if (msg.type === "typing") {
                return (
                  <motion.div layout key={msg.id} className="flex items-end gap-2 w-full mt-4">
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
                      {isInfected ? "Y" : "M"}
                    </div>
                    <TypingIndicator />
                  </motion.div>
                );
              }

              return null;
            })}
          </AnimatePresence>
        </div>

        {/* Date stamp, placed after the messages in DOM so it appears at the visual TOP */}
        <p className="responsive-date-stamp" style={{ marginTop: 24, marginBottom: 16 }}>
          Today
        </p>
      </div>

      {/* ── Input Bar & Suggestions ── */}
      <div 
        style={{
          flexShrink: 0,
          padding: "0 0 20px 0",
          background: "#000000",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}
      >
        {/* Apple Intelligence Style Chips */}
        <AnimatePresence>
          {!isWaitingForResponse && filteredChoices.length > 0 && !isPermanentlyBroken && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ width: "100%", overflow: "hidden" }}
            >
              <div
                style={{ 
                  width: "100%", maxWidth: 560, margin: "0 auto",
                  display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", 
                  padding: "8px 20px 12px 20px",
                  position: "relative"
                }}
              >
                <AnimatePresence mode="popLayout">
                  {isInfected ? (
                     <div className="px-5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[12px] italic">
                        Yes.
                      </div>
                  ) : filteredChoices.map((c, i) => {
                    const isFinalEasterEgg = askedIdsRef.current.has(c.id) && duplicateCount >= 2;
                    return (
                      <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.6, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, y: -10 }}
                        transition={{ 
                          type: "spring", stiffness: 450, damping: 25, 
                          layout: { type: "spring", stiffness: 350, damping: 25 },
                          delay: i * 0.03
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.94 }}
                        key={c.id}
                        className={isFinalEasterEgg ? "reward-chip" : ""}
                        onClick={() => {
                          if (isExploded) return;
                          
                          // Custom logic for "Yes" infestation choices
                          if (c.id === "yes-inf") {
                             setInputValue("yes");
                             return;
                          }

                          const newText = `${c.emoji ? c.emoji + " " : ""}${c.label}`.trim();

                          // Handle Redundant Clicks logic
                          if (inputValue.trim().toLowerCase() === newText.toLowerCase()) {
                            if (isPermanentlyBroken) return;

                            if (hasRestored) {
                               const nextTroll = protoTrollCount + 1;
                               setProtoTrollCount(nextTroll);
                               setBulgeTrigger(prev => prev + 1);
                               setBaseScale(prev => prev + 0.1);

                               const sendMaxComment = (comment: string) => {
                                 setMessages(prev => [...prev, { id: `proto-troll-${Date.now()}`, role: "max", type: "text", text: comment }]);
                               };

                               if (nextTroll === 2) sendMaxComment("Are you serious?");
                               
                               if (nextTroll >= 10) {
                                 setIsExploded(true);
                                 setIsPermanentlyBroken(true);
                               }
                               return;
                            }

                            if (!hasRestored) {
                              // Threshold before explosion: ~10 redundant clicks (baseScale 1.0 -> 2.0)
                              if (baseScale >= 2.0) {
                                setIsExploded(true);
                                return;
                              }
                              
                              // If same text, trigger balloon bulge
                              setBulgeTrigger(prev => prev + 1);
                              setBaseScale(prev => prev + 0.1); // Grows slightly larger
                            }
                            return;
                          }
                          setInputValue(newText);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        }}
                        style={{
                          flexShrink: 0,
                          padding: "6px 12px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "16px",
                          color: "#FFFFFF",
                          fontSize: "12px",
                          fontWeight: 500,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.emoji}&nbsp;{c.label}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ maxWidth: 560, width: "100%", padding: "0 20px 24px 20px", marginTop: "16px" }}>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleCustomSend();
            }}
            style={{ width: "100%", margin: 0, padding: 0, position: "relative" }}
          >
            <input 
              type="text"
              className={`shimmering-input ${isPermanentlyBroken ? "opacity-30 cursor-not-allowed" : ""}`}
              placeholder={isPermanentlyBroken ? "" : (isInfected ? "yes" : "Write a message...")}
              value={isPermanentlyBroken ? "" : (isInfected ? "yes" : inputValue)}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isWaitingForResponse || isGhosting || isInfected || isPermanentlyBroken}
              style={{
                width: "100%",
                background: "#262628",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "10px 45px 10px 20px",
                fontSize: "15px",
                outline: "none",
                caretColor: "#0A84FF",
              }}
            />
            {/* L'icône change légèrement d'opacité selon si l'input est valide */}
            <AnimatePresence>
              {!isExploded ? (
                <motion.button 
                  key={`send-btn-${bulgeTrigger}`}
                  type="submit"
                  disabled={!isValidChoice || isWaitingForResponse}
                  className={(isValidChoice && !isWaitingForResponse) ? "send-button-ready" : ""}
                  initial={{ scale: baseScale }}
                  animate={bulgeTrigger > 0 ? {
                    scale: [baseScale, baseScale * 1.5, baseScale + 0.1]
                  } : { scale: baseScale }}
                  exit={{ scale: 2.5, opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ 
                    duration: 0.4,
                    times: [0, 0.5, 1],
                    ease: "easeOut"
                  }}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    y: "-50%",
                    background: isValidChoice ? "#0A84FF" : "rgba(10,132,255,0.5)",
                    border: "none",
                    borderRadius: hasRestored ? "14px" : "50%",
                    width: hasRestored ? "48px" : "28px",
                    height: "28px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: (isValidChoice && !isExploded) ? "pointer" : "default",
                    transition: "background 0.2s ease",
                  }}
                >
                  <ArrowUp size={16} color="#FFFFFF" strokeWidth={3} />
                </motion.button>
              ) : (
                <div 
                  ref={slotRef}
                  key="explosion-container"
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    border: "2px dashed rgba(10, 132, 255, 0.3)", // Target drop zone
                    background: "rgba(10, 132, 255, 0.05)"
                  }}
                >
                  {/* Explosion Particles */}
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="shrapnel" 
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        transform: `rotate(${i * 60}deg) translateY(-10px)`,
                        animationDelay: `${i * 0.05}s`
                      }} 
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      {/* Global Drag Overlay (Auto-Magnet repair) */}
      <AnimatePresence>
        {(isDraggingSpare && !isPermanentlyBroken) && (
          <motion.div
            initial={{ 
              x: typeof window !== "undefined" ? window.innerWidth / 2 - 24 : 0, 
              y: typeof window !== "undefined" ? window.innerHeight / 2 - 24 : 0,
              scale: 0 
            }}
            animate={{ 
              x: slotRef.current ? slotRef.current.getBoundingClientRect().left : 0,
              y: slotRef.current ? slotRef.current.getBoundingClientRect().top : 0,
              scale: [0, 1.2, 1],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              x: { type: "spring", stiffness: 100, damping: 20, delay: 0.5 },
              y: { type: "spring", stiffness: 100, damping: 20, delay: 0.5 },
              scale: { duration: 0.4 }
            }}
            onAnimationComplete={(definition) => {
              if (typeof definition === "object" && "x" in definition) {
                setTimeout(async () => {
                  setIsWaitingForResponse(true);
                  setIsDraggingSpare(false);
                  setIsExploded(false);
                  setHasRestored(true);
                  setBaseScale(1);
                  setBulgeTrigger(0);
                  
                  const timestamp = Date.now();
                  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

                  // SEQUENCE START
                  setMessages(prev => [...prev, { id: `restore-msg-1`, role: "max", type: "typing" }]);
                  await wait(1500);
                  setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `restore-msg-1`, role: "max", type: "text", text: "Aight." }]);
                  
                  setMessages(prev => [...prev, { id: `restore-msg-2`, role: "max", type: "typing" }]);
                  await wait(1200);
                  setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `restore-msg-2`, role: "max", type: "text", text: "..." }]);

                  setMessages(prev => [...prev, { id: `restore-msg-3`, role: "max", type: "typing" }]);
                  await wait(3500);
                  setMessages(prev => [...prev.filter(m => m.type !== "typing"), { id: `restore-msg-3`, role: "max", type: "text", text: "Not the best fit, i mean it was a prototype after all... what mattered back in time was the functionnalities you know? all this front end useless stuff..." }]);

                  setMessages(prev => [...prev, { id: `restore-msg-4`, role: "max", type: "typing" }]);
                  await wait(2000);
                  setMessages(prev => [
                    ...prev.filter(m => m.type !== "typing"), 
                    { id: `restore-msg-4`, role: "max", type: "text", text: "Whatever, any questions about my profile?" }
                  ]);
                  
                  setIsWaitingForResponse(false);
                }, 200);
              }
            }}
            className="fixed z-[9999] flex items-center justify-center shadow-2xl pointer-events-none"
            style={{ 
              left: 0,
              top: 0,
              width: "50px",
              height: "30px",
              borderRadius: "15px",
              background: "linear-gradient(135deg, #0A84FF 0%, #0055DB 100%)",
              border: "2px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <ArrowUp size={24} color="#FFFFFF" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
