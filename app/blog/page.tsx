import BlogGrid from '@/components/blogs/BlogGrid';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';

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