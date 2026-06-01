import { getBlog } from '@/app/actions/blog';
import BlogDetails from '@/components/blogs/BlogDetials';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';
import type { Metadata } from 'next';

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await getBlog(slug);
  const blog = res.success && res.data ? res.data : null;

  if (!blog) {
    return {
      title: 'Blog | Yixing Yunlai',
      description: 'Expert guides from a premier Yixing Zisha pots supplier on importing wholesale ceramic flower pots.',
    };
  }

  const plainDescription = (
    blog.metaDescription ||
    blog.excerpt ||
    blog.body?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 160) ||
    ''
  );
  const metaTitle = blog.metaTitle || `${blog.title} | Yixing Yunlai`;
  const ogImage = blog.featuredImage
    ? [{ url: blog.featuredImage, width: 1200, height: 630, alt: blog.title }]
    : [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: blog.title }];

  return {
    title: metaTitle,
    description: plainDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: metaTitle,
      description: plainDescription,
      url: `https://www.yixingyunlai.com/blog/${slug}`,
      siteName: 'Yixing Yunlai',
      images: ogImage,
      type: 'article',
      publishedTime: blog.publishedAt || blog.createdAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: plainDescription,
      images: [ogImage[0].url],
    },
  };
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const { slug } = await params;

  return (
    <main>
      <PageHeroSection 
        title="Blog Details" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: 'Details', href: '#' }
        ]}
      />
      <BlogDetails slug={slug} />
      <ImageViewSection/>
    </main>
  );
};

export default BlogDetailsPage;