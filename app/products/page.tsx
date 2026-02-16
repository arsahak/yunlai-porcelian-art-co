import ProductGrid from '@/components/products/ProductGrid';
import AIRevolutionClick from '@/components/shared/AIRevolutionClick';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';

import { Suspense } from 'react';

const ProductsPage = () => {
  return (
    <main>
      <PageHeroSection 
        title="Products" 
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