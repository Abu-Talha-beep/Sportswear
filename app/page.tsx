import { HeroBannerSlider } from '@/components/sections/HeroBannerSlider';
import { HalfBannerRow } from '@/components/sections/HalfBannerRow';
import { CategoryTiles } from '@/components/sections/CategoryTiles';
import { SportCarousel } from '@/components/sections/SportCarousel';
import { ClubShopsSection } from '@/components/sections/ClubShopsSection';
import { OtherClients } from '@/components/sections/OtherClients';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Banner Slider */}
      <HeroBannerSlider />


      {/* 3. Category Tiles Grid */}
      <CategoryTiles />

      {/* 4. Sport Category Carousel */}
      <SportCarousel />

      {/* 5. Club Shops Section */}
      <ClubShopsSection />

      {/* 6. Other Clients */}
      <OtherClients />
    </>
  );
}
