import ContactForm from '@/components/contact/ContactForm';
import GoogleMap from '@/components/contact/GoogleMap';
import ImageViewSection from '@/components/shared/ImageViewSection';
import PageHeroSection from '@/components/shared/PageHeroSection';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Contact Yunlai | Trusted Yixing Zisha Pots Supplier',
  description:
    'Partner with a top Yixing Zisha pots supplier and bulk ceramic planters manufacturer. Contact us today for direct factory quotes and custom catalog downloads.',
  alternates: { canonical: '/contact-us' },
  openGraph: {
    title: 'Contact Yunlai | Trusted Yixing Zisha Pots Supplier',
    description:
      'Partner with a top Yixing Zisha pots supplier and bulk ceramic planters manufacturer. Contact us today for direct factory quotes and custom catalog downloads.',
    url: 'https://www.yixingyunlai.com/contact-us',
    siteName: 'Yixing Yunlai',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Contact Yunlai Ceramic Factory' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Yunlai | Trusted Yixing Zisha Pots Supplier',
    description:
      'Partner with a top Yixing Zisha pots supplier and bulk ceramic planters manufacturer. Contact us today for direct factory quotes and custom catalog downloads.',
    images: ['/opengraph-image.png'],
  },
};

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