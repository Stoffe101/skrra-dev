import AboutSection from "@/components/AboutSection";
import ContactCTA from "@/components/ContactCTA";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import GitHubSection from "@/components/GitHubSection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProblemsSection from "@/components/ProblemsSection";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Hoppa till innehållet
      </a>
      <Navbar />
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6"
      >
        <Hero />
        <FeaturedProjects />
        <GitHubSection />
        <TechStack />
        <AboutSection />
        <ProblemsSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
