import SmoothScroll from "@/components/SmoothScroll";
import SplashScreen from "@/components/SplashScreen";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import AboutScroll from "@/components/AboutScroll";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import FaqSection from "@/components/FaqSection";
import Contact from "@/components/Contact";
import InteractiveWaveDivider from "@/components/InteractiveWaveDivider";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white overflow-x-clip">
      <SmoothScroll />
      <SplashScreen />
      <Hero />
      <Ticker />
      <AboutScroll />
      <Projects />
      <Services />
      <Skills />
      <FaqSection />
      {/* William Sham-style Interactive Wave Divider above Footer (Amber-500) */}
      <InteractiveWaveDivider
        topColor="#fafaf9"
        fillColor="#f59e0b"
        strokeColor="rgba(28, 25, 23, 0.12)"
        className="-mb-1 z-10"
      />
      <Contact />
    </main>
  );
}
