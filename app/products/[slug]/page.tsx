import ProductDetails from '@/components/products/ProductDetials';
import AIRevolutionClick from '@/components/shared/AIRevolutionClick';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params;
  
  return (
    <main>
      <PageHeroSection 
        title="Product Details" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Details', href: '#' }
        ]}
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductDetails slug={slug} />
      </div>
      <AIRevolutionClick/>
      <ImageViewSection/>
    </main>
  );
};

export default ProductDetailsPage;
