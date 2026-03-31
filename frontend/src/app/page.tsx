import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { AIDevelopment } from "@/components/sections/ai-development";
import { SpecDriven } from "@/components/sections/spec-driven";
import { AIChat } from "@/components/sections/ai-chat";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <AIDevelopment />
      <SpecDriven />
      <Projects />
      <Experience />
      <Contact />
      <AIChat />
    </>
  );
}
