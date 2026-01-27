import BrandingSection from '@/components/home/BrandingSection';
import FindTheRightPot from '@/components/home/FindTheRightPot';
import HeroSection from '@/components/home/HeroSection';
import ImageViewSection from '@/components/home/ImageViewSection';
import InsighedSection from '@/components/home/InsighedSection';
import MeetTheTrends from '@/components/home/MeetTheTrends';
import NewToYou from '@/components/home/NewToYou';
import OurServices from '@/components/home/OurServices';
import OurWorksAndProcess from '@/components/home/OurWorksAndProcess';

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSection />
      <BrandingSection />
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
