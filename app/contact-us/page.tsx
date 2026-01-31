import ContactForm from '@/components/contact/ContactForm';
import GoogleMap from '@/components/contact/GoogleMap';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';

const ContactUsPage = () => {
  return (
    <main>
       <PageHeroSection 
        title="Contact Us" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us', href: '/contact-us' }
        ]}
      />
      
    <ContactForm/>
    <GoogleMap />
    <ImageViewSection/>
    </main>
  );
};

export default ContactUsPage;