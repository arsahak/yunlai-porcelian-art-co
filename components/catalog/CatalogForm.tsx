"use client";

import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import Translations from '@/messages/translations';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import { useState } from 'react';

const CatalogForm = () => {
  const { locale } = useLocale();
  const t = Translations[locale].Catalog.Form;

  const [formData, setFormData] = useState({
    company: '',
    name: '',
    country: '',
    email: '',
    phone: '',
    isCustomer: 'no',
    catalogs: [] as string[]
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Catalog options matching the design
  const catalogOptions = [
    t.options.outdoor,
    t.options.indoor,
    t.options.fiberglass,
    t.options.fibercement,
    t.options.metal,
    t.options.wicker
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData(prev => {
      const newCatalogs = prev.catalogs.includes(option)
        ? prev.catalogs.filter(c => c !== option)
        : [...prev.catalogs, option];
      return { ...prev, catalogs: newCatalogs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const templateParams = {
        company: formData.company,
        from_name: formData.name,
        country: formData.country,
        from_email: formData.email,
        phone: formData.phone,
        is_customer: formData.isCustomer === 'yes' ? t.options.yes : t.options.no,
        catalogs: formData.catalogs.join(', '),
        date: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        'service_xh718mb',
        'template_01i8v0b',
        templateParams,
        'JSTIICpi4oohGdpyw'
      );
      setSubmitted(true);
      setFormData({
        company: '',
        name: '',
        country: '',
        email: '',
        phone: '',
        isCustomer: 'no',
        catalogs: []
      });
    } catch (error) {
       console.error('FAILED...', error);
       setStatus({ type: 'error', message: t.error });
    } finally {
        setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-title text-gray-900 mb-4">{t.success.title}</h2>
          <p className="text-gray-600 text-lg mb-8">
            {t.success.message}
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-primary font-medium hover:underline"
          >
            {t.success.button}
          </button>
        </div>
      </div>
    );
  }

  return (
    <ScrollMotion animation="fade-up">
    <section className="py-8 md:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-title text-gray-900 leading-tight">
            {t.header.main} <br className="hidden md:block"/>
            {t.header.sub} <span className="text-primary italic">{t.header.subItalic}</span>
          </h2>
        </div>

        {/* Form Card */}
        <div className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[700px]">
          
          {/* Left: Illustration */}
          <div className="w-full md:w-5/12 bg-[#FFF3E6] relative flex items-center justify-center p-12 order-2 md:order-1">
             {/* Note: In a real implementation, replace this with the actual illustration path */}
             <div className="relative w-full h-full min-h-[300px] md:min-h-full">
                <Image
                  src="/assets/catalog/catalogbg.png" 
                  alt="Ceramic Catalog Illustration"
                  fill
                  className="object-contain object-center scale-95 hover:scale-100 transition-transform duration-700"
                  unoptimized
                />
             </div>
             
             {/* Decorative texture overlay (optional) */}
             <div className="absolute inset-0 bg-[#FFF3E6] opacity-10 pointer-events-none mix-blend-multiply" 
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }}>
             </div>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-7/12 bg-[#E9F7EB] p-8 md:p-12 lg:p-16 order-1 md:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Company */}
              <div className="space-y-1">
                 <input 
                    type="text" 
                    name="company"
                    required
                    placeholder={t.fields.company}
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                    value={formData.company}
                    onChange={handleInputChange}
                 />
              </div>

              {/* Name & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                   <input 
                      type="text" 
                      name="name"
                      required
                      placeholder={t.fields.name}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                      value={formData.name}
                      onChange={handleInputChange}
                   />
                </div>
                <div className="space-y-1">
                   <input 
                      type="text" 
                      name="country"
                      required
                      placeholder={t.fields.country}
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                      value={formData.country}
                      onChange={handleInputChange}
                   />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                 <input 
                    type="email" 
                    name="email"
                    required
                    placeholder={t.fields.email}
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                    value={formData.email}
                    onChange={handleInputChange}
                 />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                 <input 
                    type="tel" 
                    name="phone"
                    placeholder={t.fields.phone}
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                    value={formData.phone}
                    onChange={handleInputChange}
                 />
              </div>

              <div className="pt-4 space-y-4">
                {/* Existing Customer */}
                <div>
                   <label className="block text-gray-900 text-sm font-medium mb-3">{t.fields.isCustomer}</label>
                   <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.isCustomer === 'no' ? 'border-primary' : 'border-gray-400 group-hover:border-gray-600'}`}>
                           {formData.isCustomer === 'no' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                        </div>
                        <input 
                           type="radio" 
                           name="isCustomer" 
                           value="no" 
                           checked={formData.isCustomer === 'no'}
                           onChange={handleInputChange}
                           className="hidden"
                        />
                        <span className="text-gray-700 text-sm">{t.options.no}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.isCustomer === 'yes' ? 'border-primary' : 'border-gray-400 group-hover:border-gray-600'}`}>
                           {formData.isCustomer === 'yes' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                        </div>
                        <input 
                           type="radio" 
                           name="isCustomer" 
                           value="yes" 
                           checked={formData.isCustomer === 'yes'}
                           onChange={handleInputChange}
                           className="hidden"
                        />
                        <span className="text-gray-700 text-sm">{t.options.yes}</span>
                      </label>
                   </div>
                </div>

                {/* Catalogs */}
                <div>
                  <label className="block text-gray-900 text-sm font-medium mb-3">{t.fields.whichCatalogs}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {catalogOptions.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group py-1">
                         <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${formData.catalogs.includes(option) ? 'border-primary bg-primary' : 'border-gray-400 bg-white group-hover:border-gray-600'}`}>
                            {formData.catalogs.includes(option) && (
                              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                         </div>
                         <input 
                            type="checkbox"
                            className="hidden"
                            checked={formData.catalogs.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                         />
                         <span className="text-gray-700 text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                 <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                   {loading ? t.fields.sending : t.fields.submit}
                 </button>
                 {status && (
                    <div className={`mt-4 text-sm font-medium ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {status.message}
                    </div>
                 )}
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
    </ScrollMotion>
  );
};

export default CatalogForm;
