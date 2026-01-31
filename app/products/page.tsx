import ProductGrid from '@/components/products/ProductGrid';
import AIRevolutionClick from '@/components/shared/AIRevolutionClick';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';

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
      
      <div className="container mx-auto px-4 py-8">
      <ProductGrid />
      </div>
      <AIRevolutionClick/>
      <ImageViewSection/>
    </main>
  );
};

export default ProductsPage;