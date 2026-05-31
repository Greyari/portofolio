import ClientHero from "@/components/ClientHero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ClientHero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}