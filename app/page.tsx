import FindTheRightPot from "@/components/home/FindTheRightPot";
import HeroSection from "@/components/home/HeroSection";
import InsighedSection from "@/components/home/InsighedSection";
import MeetTheTrends from "@/components/home/MeetTheTrends";
import NewToYou from "@/components/home/NewToYou";
import OurServices from "@/components/home/OurServices";
import OurWorksAndProcess from "@/components/home/OurWorksAndProcess";
import ImageViewSection from "@/components/shared/ImageViewSection";

export const metadata = {
  title: "Wholesale Ceramic Flower Pots & Yixing Zisha Pots | Yunlai",
  description:
    "Leading wholesale ceramic flower pots supplier. Get authentic Yixing Zisha pots directly from our factory. Custom OEM/ODM designs with global shipping.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wholesale Ceramic Flower Pots & Yixing Zisha Pots | Yunlai",
    description:
      "Leading wholesale ceramic flower pots supplier. Get authentic Yixing Zisha pots directly from our factory. Custom OEM/ODM designs with global shipping.",
    url: "https://www.yixingyunlai.com",
    siteName: "Yixing Yunlai",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Yunlai Ceramic Factory" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wholesale Ceramic Flower Pots & Yixing Zisha Pots | Yunlai",
    description:
      "Leading wholesale ceramic flower pots supplier. Get authentic Yixing Zisha pots directly from our factory. Custom OEM/ODM designs with global shipping.",
    images: ["/opengraph-image.png"],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSection />
      {/* <BrandingSection /> */}
      <MeetTheTrends />
      <NewToYou />
      <FindTheRightPot />
      <OurServices />
      <OurWorksAndProcess />
      <InsighedSection />
      <ImageViewSection />
    </div>
  );
}
