import CatalogBar from '@/components/catalog/CatalogBar';
import CatalogForm from '@/components/catalog/CatalogForm';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';

const CatalogPage = () => {
  return (
    <main>
      <PageHeroSection 
        title="Catalog" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Catalog', href: '/catalog' }
        ]}
      />
      
      <CatalogForm />
      <CatalogBar />
      <ImageViewSection/>
    </main>
  );
};

export default CatalogPage;