import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import TemplatesSection from "@/components/landing/templates-section";
import CtaSection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
