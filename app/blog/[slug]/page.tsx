import BlogDetails from '@/components/blogs/BlogDetials';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
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