import { ChatInterface } from "./components/ChatInterface";
import { AppleFooter } from "./components/AppleFooter";
import "./index.css";

export default function App() {
  return (
    <div className="min-h-screen bg-black dark antialiased">
      <ChatInterface />
      <AppleFooter />
    </div>
  );
}