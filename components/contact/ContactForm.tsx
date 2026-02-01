"use client";

import { useLocale } from '@/lib/i18n';
import Translations from '@/messages/translations';
import emailjs from '@emailjs/browser';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import ScrollMotion from '../motion/ScrollMotion';

const ContactForm = () => {
  const { locale } = useLocale();
  const t = Translations[locale].ContactForm;
  
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    country: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    // Map form data to template parameters
    // Note: The keys here should match the variables in your EmailJS template.
    const templateParams = {
        company: formData.company,
        from_name: formData.name, 
        country: formData.country,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        date: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        'service_xh718mb',
        'template_s8cavho',
        templateParams,
        'JSTIICpi4oohGdpyw'
      );
      setStatus({ type: 'success', message: t.success });
      setFormData({
        company: '',
        name: '',
        country: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('FAILED...', error);
      setStatus({ type: 'error', message: t.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Section: Form */}
      <ScrollMotion animation="fade-up">
      <section className="container mx-auto px-4 py-8 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl md:text-5xl font-title text-gray-900 leading-tight">
              {t.title} <span className="text-primary">{t.subtitle}</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Row 1 */}
            <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1">{t.company} <span className="text-red-500">*</span></label>
               <input 
                 type="text" 
                 name="company"
                 required
                 value={formData.company}
                 onChange={handleChange}
                 className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                 placeholder={t.companyPlaceholder}
               />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.name} <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                    placeholder={t.namePlaceholder}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.country} <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                    placeholder={t.countryPlaceholder}
                  />
               </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.email} <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                    placeholder={t.emailPlaceholder}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                    placeholder={t.phonePlaceholder}
                  />
               </div>
            </div>

             {/* Message */}
            <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
               <textarea 
                 name="message"
                 rows={1}
                 value={formData.message}
                 onChange={handleChange}
                 className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent resize-none"
                 placeholder={t.messagePlaceholder}
               />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-full bg-gradient-to-b from-[#3DA754] to-[#28883D] text-white font-medium shadow-[0_4px_10px_rgba(40,136,61,0.3)] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 min-w-[160px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    {t.sending}
                  </>
                ) : (
                  t.sendButton
                )}
              </button>
              {status && (
                <div className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {status.message}
                </div>
              )}
            </div>

          </form>
        </div>
      </section>
      </ScrollMotion>

      {/* Bottom Section: Info Cards */}
      <ScrollMotion animation="fade-up">
      <section className="w-full bg-[#FAFAFA] relative overflow-hidden py-8 md:py-20">
        {/* Background decorative pattern - simplified topographic approximation using CSS opacity rings or similar, 
            or just clean background as specific svg is not available. 
            Using a subtle faint pattern if possible, or just whitespace. */}
        <div className="absolute inset-0 z-0">
             <Image
               src="/assets/contact/contact-image.png" 
               alt="Contact Background" 
               fill 
               className="object-cover"
             />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
             {/* Left Text */}
             <div className="md:w-1/3 pt-8">
                <span className="text-gray-500 text-sm uppercase tracking-wider mb-2 block">{t.infoTitle}</span>
                <h3 className="text-3xl md:text-4xl font-title leading-snug text-gray-900">
                   {t.infoSubtitle}
                </h3>
             </div>

             {/* Cards */}
             <div className="md:w-2/3 flex flex-col md:flex-row gap-6 w-full">
                
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm flex-1 min-h-[280px] flex flex-col">
                   <h4 className="font-title text-lg mb-6">{t.infoCardTitle}</h4>
                   <div className="w-8 h-0.5 bg-black mb-6"></div>
                   
                   <div className="space-y-4 flex-grow">
                      <div>
                         <p className="text-gray-500 text-xs uppercase mb-1">{t.emailLabel}</p>
                         <p className="font-medium text-gray-900">exampla@info.com</p>
                      </div>
                      <div>
                         <p className="text-gray-500 text-xs uppercase mb-1">{t.phoneLabel}</p>
                         <p className="font-medium text-gray-900">(+84) 975 947 573</p>
                      </div>
                   </div>

                   <div className="mt-8">
                      <p className="text-gray-500 text-xs uppercase mb-3">{t.socialLabel}</p>
                      <div className="flex items-center gap-4 text-gray-900">
                         <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                         <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                         <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                         <a href="#" className="hover:text-primary transition-colors"><Youtube size={20} /></a>
                      </div>
                   </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm flex-1 min-h-[280px] flex flex-col">
                   <h4 className="font-title text-lg mb-6">{t.addressCardTitle}</h4>
                   <div className="w-8 h-0.5 bg-black mb-6"></div>
                   
                   <div className="space-y-4 flex-grow">
                      <div>
                         <p className="text-gray-500 text-xs uppercase mb-1">{t.addressLabel}</p>
                         <p className="font-medium text-gray-900 leading-relaxed">
                            {t.addressValue}
                         </p>
                      </div>
                      <div>
                         <p className="text-gray-500 text-xs uppercase mb-1">{t.workingTimeLabel}</p>
                         <p className="font-medium text-gray-900 leading-relaxed">
                            {t.workingTimeValue}
                         </p>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </section>
      </ScrollMotion>
    </div>
  );
};

export default ContactForm;
