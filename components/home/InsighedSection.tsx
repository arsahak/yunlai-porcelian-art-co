'use client';

import { Blog, getRecentBlogs } from '@/app/actions/blog';
import ScrollMotion from '@/components/motion/ScrollMotion';
import Button from '@/components/shared/Button';
import { useLocale } from '@/lib/i18n';
import translations from '@/messages/translations';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const InsighedSection = () => {
  const { locale } = useLocale();
  const t = translations[locale].Insights;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await getRecentBlogs(4); // Get 4 recent published blogs
        if (response.success && response.data) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return t.date || 'Recent';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Strip HTML tags from blog body for excerpt
  const getExcerpt = (html: string, maxLength: number = 150) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <ScrollMotion animation="fade-up">
      <section className="w-full bg-gray-50/50 py-8 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-12">
            <div className="max-w-2xl md:text-left text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-3">
                {t.titlePrefix} <span className="text-primary">{t.titleSuffix}</span>
              </h2>
              <p className="text-gray-500 text-lg">
                {t.subtitle}
              </p>
            </div>
            
            <Button 
              href="/blog" 
              className="!px-8 !py-3 bg-primary hover:bg-primary/90 shadow-lg"
            >
              {t.explore}
            </Button>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] rounded-2xl bg-gray-200 mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {blogs.map((blog) => (
                <Link 
                  href={`/blog/${blog.slug}`} 
                  key={blog._id} 
                  className="group cursor-pointer"
                >
                  {/* Image Card */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-100 to-purple-100">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl font-bold text-primary/30">
                          {blog.title[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    {blog.category && (
                      <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {blog.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed text-sm line-clamp-3">
                      {blog.excerpt || getExcerpt(blog.body)}
                    </p>

                    {/* Author */}
                    {blog.createdBy && (
                      <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                        By {blog.createdBy.name}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts available yet</p>
            </div>
          )}
        </div>
      </section>
    </ScrollMotion>
  );
};

export default InsighedSection;
