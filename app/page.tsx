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
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
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
