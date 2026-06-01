import BlogGrid from '@/components/blogs/BlogGrid';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ceramic Pots Industry Insights | Yixing Zisha Pots Supplier',
  description:
    'Expert guides from a premier Yixing Zisha pots supplier. Learn tips on importing wholesale ceramic flower pots, market trends, and manufacturing workflows.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Ceramic Pots Industry Insights | Yixing Zisha Pots Supplier',
    description:
      'Expert guides from a premier Yixing Zisha pots supplier. Learn tips on importing wholesale ceramic flower pots, market trends, and manufacturing workflows.',
    url: 'https://www.yixingyunlai.com/blog',
    siteName: 'Yixing Yunlai',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Yunlai Ceramic Blog' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ceramic Pots Industry Insights | Yixing Zisha Pots Supplier',
    description:
      'Expert guides from a premier Yixing Zisha pots supplier. Learn tips on importing wholesale ceramic flower pots, market trends, and manufacturing workflows.',
    images: ['/opengraph-image.png'],
  },
};

const BlogPage = () => {
  return (
    <main>
      <PageHeroSection 
        title="Ceramic Pot Insights & Factory Stories"
        subtitle="Manufacturing insights, OEM production, and wholesale trends."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' }
        ]}
      />
      
    <BlogGrid/>
    <ImageViewSection/>
    </main>
  );
};

export default BlogPage;