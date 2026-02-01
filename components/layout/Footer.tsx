'use client';

import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import emailjs from '@emailjs/browser';
import { Facebook, Instagram, Mail, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const { locale } = useLocale();
  const t = translations[locale].Footer;
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);

    const templateParams = {
        company: 'Newsletter Subscriber',
        from_name: 'Subscriber', 
        country: '',
        from_email: email,
        phone: '',
        message: 'Newsletter Subscription Request',
        date: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        'service_xh718mb',
        'template_s8cavho',
        templateParams,
        'JSTIICpi4oohGdpyw'
      );
      setStatus({ type: 'success', message: 'Subscribed successfully!' });
      setEmail('');
    } catch (error) {
       console.error('FAILED...', error);
       setStatus({ type: 'error', message: 'Failed to subscribe. Please try again.' });
    } finally {
        setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-[#f8f9fa] pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Banner */}
        <div className="w-full bg-primary rounded-3xl p-6 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 shadow-xl relative overflow-hidden">
           {/* Decorative sheen/glow could be added here */}
           
           <div className="max-w-md text-center lg:text-left">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
               {t.subscribeTitle}
             </h2>
             {status && (
               <p className={`mt-2 text-sm font-medium ${status.type === 'success' ? 'text-green-200' : 'text-red-200'}`}>
                 {status.message}
               </p>
             )}
           </div>

           <form onSubmit={handleSubscribe} className="w-full max-w-lg bg-white p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center shadow-lg gap-2 md:gap-0">
             <div className="flex-1 flex items-center w-full px-4 md:pl-6 h-12 md:h-auto">
                <Mail className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.subscribePlaceholder}
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 h-full py-2 min-w-0"
                  required
                />
             </div>
             <button 
               type="submit"
               disabled={loading}
               className="w-full md:w-auto bg-primary hover:bg-green-700 text-white font-bold text-sm px-8 py-3 rounded-xl md:rounded-full transition-colors uppercase tracking-wider shrink-0 shadow-md md:shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
             >
               {loading ? t.sending : t.subscribeBtn}
             </button>
           </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 min-[480px]:col-span-2 lg:col-span-4 space-y-6 text-center lg:text-left">
            <Link href="/" className="inline-block relative h-24 w-24">
               <Image 
                 src="/assets/site-logo/site-logo.png" 
                 alt="Yunlai Porcelain" 
                 fill
                 className="object-contain"
               />
               {/* Fallback circle if logo fails/is transparent */}
               <div className="absolute inset-0 border-2 border-primary rounded-full -z-10" />
            </Link>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base lg:pr-4 mx-auto lg:mx-0 max-w-md lg:max-w-none">
              {t.description}
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 lg:col-start-6 text-center min-[480px]:text-left">
            <h3 className="font-serif font-bold text-lg text-secondary mb-6">{t.learnMore}</h3>
            <ul className="space-y-4">
              {['About Us', 'Process', 'Environment', 'Careers', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 text-center min-[480px]:text-left">
            <h3 className="font-serif font-bold text-lg text-secondary mb-6">{t.support}</h3>
             <ul className="space-y-4">
              {['Customer Care', 'Shipping', 'Returns', 'FAQ'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 text-center min-[480px]:text-left">
            <h3 className="font-serif font-bold text-lg text-secondary mb-6">{t.contact}</h3>
            <div className="space-y-4 text-sm text-gray-500 flex flex-col items-center min-[480px]:items-start">
               <div>
                  <p className="font-medium text-gray-900 mb-1">{t.hotelRes}:</p>
                  <p>123-456-7890</p>
               </div>
               <div>
                  <p className="font-medium text-gray-900 mb-1">{t.ticketOffice}:</p>
                  <p>123-456-7890</p>
               </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            {t.rights}
          </p>
          
          <div className="flex items-center space-x-6">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="text-secondary hover:text-primary transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
