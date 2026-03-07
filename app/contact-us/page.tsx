import ContactForm from '@/components/contact/ContactForm';
import GoogleMap from '@/components/contact/GoogleMap';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';
import { Suspense } from 'react';

const ContactUsPage = () => {
  return (
    <main>
       <PageHeroSection 
        title="Contact Our Ceramic Pot Factory"
        subtitle="Send inquiry for bulk orders, OEM customization, and pricing."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us', href: '/contact-us' }
        ]}
      />
      
    <Suspense fallback={<div className="min-h-[400px]" />}>
      <ContactForm/>
    </Suspense>
    <GoogleMap />
    <ImageViewSection/>
    </main>
  );
};

export default ContactUsPage;