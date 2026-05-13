import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Experience />
      <Contact />
    </main>
  );
}