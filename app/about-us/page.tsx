import type { Metadata } from "next";
import OurProudNumber from "@/components/about/OurProudNumber";
import OurService from "@/components/about/OurService";
import WelcomeSection from "@/components/about/WelcomSection";
import AIRevolutionClick from "@/components/shared/AIRevolutionClick";
import ImageViewSection from "@/components/shared/ImageViewSection";
import PageHeroSection from "@/components/shared/PageHeroSection";

export const metadata: Metadata = {
  title: "About Yunlai | Bulk Ceramic Planters Manufacturer & Factory",
  description:
    "Discover Yunlai, a trusted bulk ceramic planters manufacturer. Learn about our heritage in Zisha art, large factory capacity, and strict quality control.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Yunlai | Bulk Ceramic Planters Manufacturer & Factory",
    description:
      "Discover Yunlai, a trusted bulk ceramic planters manufacturer. Learn about our heritage in Zisha art, large factory capacity, and strict quality control.",
    url: "https://www.yixingyunlai.com/about-us",
    siteName: "Yixing Yunlai",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Yunlai Ceramic Factory" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Yunlai | Bulk Ceramic Planters Manufacturer & Factory",
    description:
      "Discover Yunlai, a trusted bulk ceramic planters manufacturer. Learn about our heritage in Zisha art, large factory capacity, and strict quality control.",
    images: ["/opengraph-image.png"],
  },
};

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
