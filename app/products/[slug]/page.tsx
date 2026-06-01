import { getProduct } from '@/app/actions/products';
import ProductDetails from '@/components/products/ProductDetials';
import AIRevolutionClick from '@/components/shared/AIRevolutionClick';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';
import type { Metadata } from 'next';

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await getProduct(slug);
  const product = res.success && res.data ? res.data : null;

  if (!product) {
    return {
      title: 'Wholesale Ceramic Flower Pots & Planters | OEM Factory China',
      description:
        'Looking for an OEM ceramic pots factory China? Buy wholesale ceramic flower pots directly from the manufacturer. Low MOQ and weather-resistant designs.',
    };
  }

  const plainDescription = product.description
    ?.replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 160) || '';
  const metaTitle = `${product.name} | Wholesale Ceramic Pots | Yunlai`;
  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const ogImage = primaryImage
    ? [{ url: primaryImage.url, width: 1200, height: 630, alt: product.name }]
    : [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: product.name }];

  return {
    title: metaTitle,
    description: plainDescription,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: metaTitle,
      description: plainDescription,
      url: `https://www.yixingyunlai.com/products/${slug}`,
      siteName: 'Yixing Yunlai',
      images: ogImage,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: plainDescription,
      images: [ogImage[0].url],
    },
  };
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params;
  
  return (
    <main className="bg-white">
      <PageHeroSection 
        title="Product Details" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Details', href: '#' }
        ]}
      />
      
      <div className="bg-white w-full">
        <ProductDetails slug={slug} />
      </div>
      <AIRevolutionClick/>
      <ImageViewSection/>
    </main>
  );
};

export default ProductDetailsPage;
