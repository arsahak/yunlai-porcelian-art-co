'use client';

import Button from '@/components/shared/Button';
import { useLocale, type Locale } from '@/lib/i18n';
import translations from '@/messages/translations';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const t = translations[locale].Navigation;
  const commonT = translations[locale].Common;

  const toggleLanguage = () => {
    const newLocale: Locale = locale === 'en' ? 'cn' : 'en';
    setLocale(newLocale);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: t.home, href: '/' },
    { name: t.products, href: '/products', hasDropdown: true },
    { name: t.catalog, href: '/catalog' },
    { name: t.blog, href: '/blog' },
    { name: t.about, href: '/about' },
    { name: t.contact, href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-sm py-2' 
            : 'bg-white py-4'
        }`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
             <Image 
               src="/assets/site-logo/site-logo.png" 
               alt="Yunlai Porcelain Art" 
               width={550} 
               height={350}
               className="h-12 md:h-16 w-auto object-contain transition-opacity hover:opacity-90"
               priority
             />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 py-2
                    ${pathname === link.href ? 'text-primary' : 'text-secondary/80'}
                  `}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {/* Simple Horizontal Underline Hover Effect */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
             {/* Language Switcher */}
             <button 
               onClick={toggleLanguage}
               className="flex items-center gap-1 text-sm font-medium text-secondary hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
             >
               <Globe className="w-4 h-4" />
               <span className="uppercase">{locale}</span>
             </button>

             <Button 
               href="/contact" 
               className="!px-6 !py-2 !text-sm"
             >
               {commonT.contactUs}
             </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-secondary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: { 
                y: '-100%',
                transition: { 
                  type: "spring",
                  stiffness: 400, 
                  damping: 40 
                }
              },
              open: { 
                y: 0,
                transition: { 
                  type: "spring",
                  stiffness: 400, 
                  damping: 40,
                  staggerChildren: 0.1,
                  delayChildren: 0.1
                }
              }
            }}
            className="fixed inset-0 z-40 bg-white lg:hidden pt-24 px-6 overflow-y-auto mt-10"
          >
            <div className="container mx-auto flex flex-col space-y-6 pb-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    closed: { opacity: 0, x: -20 },
                    open: { opacity: 1, x: 0 }
                  }}
                >
                  <Link 
                    href={link.href}
                    className="block text-xl font-title font-medium text-secondary hover:text-primary transition-colors border-b border-gray-100 pb-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Language Switcher */}
              <motion.div 
                variants={{
                  closed: { opacity: 0, x: -20 },
                  open: { opacity: 1, x: 0 }
                }}
                className="flex items-center justify-between py-4 border-b border-gray-100"
              >
                <span className="text-secondary font-medium">Language</span>
                <button 
                  onClick={() => {
                    toggleLanguage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-secondary hover:text-primary border border-gray-200"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{locale === 'en' ? 'English' : '中文'}</span>
                </button>
              </motion.div>

              <motion.div 
                variants={{
                  closed: { opacity: 0, y: 20 },
                  open: { opacity: 1, y: 0 }
                }}
                className="pt-4"
              >
                <Button href="/contact" className="w-full justify-center">
                  {commonT.contactUs}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
