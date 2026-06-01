import CatalogBar from '@/components/catalog/CatalogBar';
import CatalogForm from '@/components/catalog/CatalogForm';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bulk Ceramic Planters Manufacturer & Zisha Pots Catalog',
  description:
    'Browse our bulk ceramic planters manufacturer catalog. Factory direct pricing on premium ceramic flower pots and customizable packaging for global importers.',
  alternates: { canonical: '/catalog' },
  openGraph: {
    title: 'Bulk Ceramic Planters Manufacturer & Zisha Pots Catalog',
    description:
      'Browse our bulk ceramic planters manufacturer catalog. Factory direct pricing on premium ceramic flower pots and customizable packaging for global importers.',
    url: 'https://www.yixingyunlai.com/catalog',
    siteName: 'Yixing Yunlai',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Yunlai Ceramic Catalog' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bulk Ceramic Planters Manufacturer & Zisha Pots Catalog',
    description:
      'Browse our bulk ceramic planters manufacturer catalog. Factory direct pricing on premium ceramic flower pots and customizable packaging for global importers.',
    images: ['/opengraph-image.png'],
  },
};

const CatalogPage = () => {
  return (
    <main>
      <PageHeroSection 
        title="Download Wholesale Ceramic Pot Catalog"
        subtitle="Get bulk pricing, OEM customization, and container shipment details."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Catalog', href: '/catalog' }
        ]}
      />
      
      <CatalogForm />
      <CatalogBar />
      <ImageViewSection/>
    </main>
  );
};

export default CatalogPage;