"use client";

import { Blog, getBlogs } from '@/app/actions/blog';
import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import Translations from '@/messages/translations';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const BlogGrid = () => {
  const { locale } = useLocale();
  const t = Translations[locale].Blog.Grid;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('publishedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const blogsPerPage = 9;

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, sortBy, sortOrder]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await getBlogs({
        page: currentPage,
        limit: blogsPerPage,
        status: 'published',
        sortBy,
        sortOrder,
      });

      if (response.success && response.data) {
        setBlogs(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.pages);
        }
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (value: string) => {
    switch (value) {
      case 'title-asc':
        setSortBy('title');
        setSortOrder('asc');
        break;
      case 'title-desc':
        setSortBy('title');
        setSortOrder('desc');
        break;
      case 'date-newest':
        setSortBy('publishedAt');
        setSortOrder('desc');
        break;
      case 'date-oldest':
        setSortBy('publishedAt');
        setSortOrder('asc');
        break;
      default:
        setSortBy('publishedAt');
        setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'cn' ? 'zh-CN' : 'en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <ScrollMotion animation="fade-up">
    <div className="container mx-auto px-8 py-20">
      {/* Header & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <h2 className="text-3xl md:text-4xl font-title">
          {t.title} <span className="text-primary">{t.subtitle}</span>
        </h2>
        
        <div className="relative">
          <select 
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-full px-6 py-2 pr-10 text-sm focus:outline-none focus:border-primary cursor-pointer hover:border-gray-300 transition-colors"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: `right 1rem center`,
              backgroundSize: `1.5em 1.5em`,
              backgroundRepeat: 'no-repeat'
            }}
          >
            <option value="date-newest">{t.sort.newest}</option>
            <option value="date-oldest">{t.sort.oldest}</option>
            <option value="title-asc">{t.sort.nameAsc}</option>
            <option value="title-desc">{t.sort.nameDesc}</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] w-full rounded-2xl bg-gray-200 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <>
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogs.map((blog) => (
              <Link 
                href={`/blog/${blog.slug}`} 
                key={blog._id} 
                className="group cursor-pointer"
              >
                {/* Featured Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-blue-100 to-purple-100">
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
                      <span className="text-6xl font-bold text-primary/20">
                        {blog.title[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {blog.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                        {blog.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Blog Content */}
                <div className="space-y-3">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-title text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt || blog.body?.substring(0, 150) + '...'}
                  </p>

                  {/* Author */}
                  {blog.author && (
                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-xs">
                          {blog.author[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {blog.author}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              {/* Previous Button */}
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              {getPaginationNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="text-gray-400 px-1">...</span>
                ) : (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-8 h-8 rounded border flex items-center justify-center text-sm font-medium transition-colors
                      ${currentPage === page 
                        ? 'border-primary text-primary bg-white' 
                        : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
                  >
                    {page}
                  </button>
                )
              ))}

              {/* Next Button */}
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">{t.noPosts}</p>
        </div>
      )}
    </div>
    </ScrollMotion>
  );
};

export default BlogGrid;
