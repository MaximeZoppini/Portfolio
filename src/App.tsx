import { AppleHero } from "./components/AppleHero";
import { AppleSpecs } from "./components/AppleSpecs";
import { AppleProjects } from "./components/AppleProjects";
import { AppleStack } from "./components/AppleStack";
import { AppleFooter } from "./components/AppleFooter";
import "./styles/globals.css";

export default function App() {
  return (
    <div className="min-h-screen bg-black dark antialiased">
      <AppleHero />
      <AppleSpecs />
      <AppleProjects />
      <AppleStack />
      <AppleFooter />
    </div>
  );
}