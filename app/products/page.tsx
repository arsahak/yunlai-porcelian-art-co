import ProductGrid from '@/components/products/ProductGrid';
import AIRevolutionClick from '@/components/shared/AIRevolutionClick';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Wholesale Ceramic Flower Pots & Planters | OEM Factory China',
  description:
    'Looking for an OEM ceramic pots factory China? Buy wholesale ceramic flower pots directly from the manufacturer. Low MOQ and weather-resistant designs.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Wholesale Ceramic Flower Pots & Planters | OEM Factory China',
    description:
      'Looking for an OEM ceramic pots factory China? Buy wholesale ceramic flower pots directly from the manufacturer. Low MOQ and weather-resistant designs.',
    url: 'https://www.yixingyunlai.com/products',
    siteName: 'Yixing Yunlai',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Wholesale Ceramic Flower Pots' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wholesale Ceramic Flower Pots & Planters | OEM Factory China',
    description:
      'Looking for an OEM ceramic pots factory China? Buy wholesale ceramic flower pots directly from the manufacturer. Low MOQ and weather-resistant designs.',
    images: ['/opengraph-image.png'],
  },
};

const ProductsPage = () => {
  return (
    <main>
      <PageHeroSection 
        title="Wholesale Ceramic Flower Pots"
        subtitle="Explore our small, medium, and large ceramic pots for bulk importers and wholesalers."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' }
        ]}
      />
      
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">Loading...</div>}>
        <ProductGrid />
      </Suspense>
      <AIRevolutionClick/>
      <ImageViewSection/>
    </main>
  );
};

export default ProductsPage;