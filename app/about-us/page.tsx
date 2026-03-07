import OurProudNumber from "@/components/about/OurProudNumber";
import OurService from "@/components/about/OurService";
import WelcomeSection from "@/components/about/WelcomSection";
import AIRevolutionClick from "@/components/shared/AIRevolutionClick";
import ImageViewSection from "@/components/shared/ImageViewSection";
import PageHeroSection from "@/components/shared/PageHeroSection";

const AboutPage = () => {
  return (
    <main>
      <PageHeroSection
        title="Real Ceramic Flower Pot Factory in Yixing, China"
        subtitle="300+ Workers | OEM Manufacturer | Global Export Supply"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about-us" },
        ]}
      />

      <WelcomeSection />
      <OurService />
      <OurProudNumber />
      <ImageViewSection />
      <AIRevolutionClick />
    </main>
  );
};

export default AboutPage;
