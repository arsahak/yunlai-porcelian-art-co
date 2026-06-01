import type { Metadata } from 'next';

interface ServiceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

type ServiceMeta = { title: string; description: string };

const SERVICE_META: Record<string, ServiceMeta> = {
  'oem-customization': {
    title: 'OEM Ceramic Pots Factory China | Custom Flower Pots',
    description:
      'Scale your brand with an OEM ceramic pots factory China. We support custom sizes, colors, glazes, and logos with low factory MOQs for global buyers.',
  },
  sampling: {
    title: 'Pre-Production Sampling | Wholesale Ceramic Flower Pots',
    description:
      'Secure your quality before mass production. We offer custom sampling for wholesale ceramic flower pots to verify size and clay finish before bulk firing.',
  },
  packaging: {
    title: 'Secure Bulk Ceramic Planters Manufacturer Packaging Safety',
    description:
      'Zero breakage transit. Learn how a premier bulk ceramic planters manufacturer packs your wholesale ceramic flower pots using reinforced heavy-duty pallets.',
  },
  export: {
    title: 'Global Export Logistics | Yixing Zisha Pots Supplier',
    description:
      'Hassle-free B2B shipping from a top Yixing Zisha pots supplier. We handle full container loading, export documents, and custom logistics for global delivery.',
  },
};

const DEFAULT_META: ServiceMeta = {
  title: 'OEM Ceramic Pots Factory China | Custom Design Services',
  description:
    'As a premier OEM ceramic pots factory China, we handle everything from inquiry to mass production. Scale your brand with custom wholesale ceramic flower pots.',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = SERVICE_META[slug] ?? DEFAULT_META;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/wholesale-services/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://www.yixingyunlai.com/wholesale-services/${slug}`,
      siteName: 'Yixing Yunlai',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: meta.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return <>{children}</>;
}
