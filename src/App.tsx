import { Hero } from "./components/Hero";
import { AppleSpecs } from "./components/AppleSpecs";
import { AppleProjects } from "./components/AppleProjects";
import { AppleStack } from "./components/AppleStack";
import { AppleFooter } from "./components/AppleFooter";
import { Experience } from "./components/Experience";
import { Infrastructure } from "./components/Infrastructure";
import "./styles/globals.css";

export default function App() {
  return (
    <div className="min-h-screen bg-black dark antialiased">
      <Hero />
      <Experience />
      <AppleProjects />
      <Infrastructure />
      <AppleStack />
      <AppleSpecs />
      <AppleFooter />
    </div>
  );
}