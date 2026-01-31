import BlogGrid from '@/components/blogs/BlogGrid';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';

const BlogPage = () => {
  return (
    <main>
      <PageHeroSection 
        title="Blog" 
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