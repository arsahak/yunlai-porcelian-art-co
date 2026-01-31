"use client";

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    country: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle submitting
  };

  return (
    <div className="w-full">
      {/* Top Section: Form */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl md:text-5xl font-title text-gray-900 leading-tight">
              Get in touch with us. <span className="text-primary">We're</span>
              <br />
              <span className="text-primary">here to assist you.</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Row 1 */}
            <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1">Your company <span className="text-red-500">*</span></label>
               <input 
                 type="text" 
                 name="company"
                 required
                 value={formData.company}
                 onChange={handleChange}
                 className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                 placeholder=" "
               />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                    placeholder=" "
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Country <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                    placeholder=" "
                  />
               </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                    placeholder=" "
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
                    placeholder=" "
                  />
               </div>
            </div>

             {/* Message */}
            <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
               <textarea 
                 name="message"
                 rows={1}
                 value={formData.message}
                 onChange={handleChange}
                 className="w-full border-b border-gray-200 py-3 focus:border-primary focus:outline-none transition-colors bg-transparent resize-none"
                 placeholder=" "
               />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="px-8 py-3 rounded-full bg-gradient-to-b from-[#3DA754] to-[#28883D] text-white font-medium shadow-[0_4px_10px_rgba(40,136,61,0.3)] hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 min-w-[160px]"
              >
                Send Message
              </button>
            </div>

          </form>
        </div>
      </section>

      {/* Bottom Section: Info Cards */}
      <section className="w-full bg-[#FAFAFA] relative overflow-hidden py-20 pb-32 mt-12">
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
                <span className="text-gray-500 text-sm uppercase tracking-wider mb-2 block">Contact Info</span>
                <h3 className="text-3xl md:text-4xl font-title leading-snug text-gray-900">
                   We are always <br />
                   <span className="text-primary">happy to assist you</span>
                </h3>
             </div>

             {/* Cards */}
             <div className="md:w-2/3 flex flex-col md:flex-row gap-6 w-full">
                
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-sm flex-1 min-h-[280px] flex flex-col">
                   <h4 className="font-title text-lg mb-6">Contact Info</h4>
                   <div className="w-8 h-0.5 bg-black mb-6"></div>
                   
                   <div className="space-y-4 flex-grow">
                      <div>
                         <p className="text-gray-500 text-xs uppercase mb-1">Email</p>
                         <p className="font-medium text-gray-900">exampla@info.com</p>
                      </div>
                      <div>
                         <p className="text-gray-500 text-xs uppercase mb-1">Phone number</p>
                         <p className="font-medium text-gray-900">(+84) 975 947 573</p>
                      </div>
                   </div>

                   <div className="mt-8">
                      <p className="text-gray-500 text-xs uppercase mb-3">Social</p>
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
                   <h4 className="font-title text-lg mb-6">Address</h4>
                   <div className="w-8 h-0.5 bg-black mb-6"></div>
                   
                   <div className="space-y-4 flex-grow">
                      <div>
                         <p className="text-gray-500 text-xs uppercase mb-1">Address</p>
                         <p className="font-medium text-gray-900 leading-relaxed">
                            8/42 Dinh Bo Linh, Ward 14, Binh Thanh District, Ho Chi Minh city.
                         </p>
                      </div>
                      <div>
                         <p className="text-gray-500 text-xs uppercase mb-1">Working time</p>
                         <p className="font-medium text-gray-900 leading-relaxed">
                            From Monday to Friday. 9AM to 6PM
                         </p>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
