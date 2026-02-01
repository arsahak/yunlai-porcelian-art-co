"use client";

import { getProducts, Product } from '@/app/actions/products';
import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import Translations from '@/messages/translations';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProductGrid = () => {
  const { locale } = useLocale();
  const t = Translations[locale].Product.Grid;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortBy, sortOrder]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts({
        page: currentPage,
        limit: productsPerPage,
        status: 'active',
        sortBy,
        sortOrder,
      });

      if (response.success && response.data) {
        setProducts(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.pages);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (value: string) => {
    switch (value) {
      case 'name-asc':
        setSortBy('name');
        setSortOrder('asc');
        break;
      case 'price-asc':
        setSortBy('price');
        setSortOrder('asc');
        break;
      case 'price-desc':
        setSortBy('price');
        setSortOrder('desc');
        break;
      case 'newest':
        setSortBy('createdAt');
        setSortOrder('desc');
        break;
      default:
        setSortBy('createdAt');
        setSortOrder('desc');
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Get primary image from product
  const getPrimaryImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      const primaryImg = product.images.find(img => img.isPrimary);
      return primaryImg?.url || product.images[0].url;
    }
    return null;
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      // Show all pages if 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show current page and neighbors
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
      
      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <ScrollMotion animation="fade-up">
    <div className="container mx-auto px-4 py-8 md:py-20">
      {/* Header & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <h2 className="text-3xl md:text-4xl font-title">
          {t.title} <span className="text-primary">{t.subtitle}</span>
        </h2>
        
        <div className="relative">
          <select 
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-full px-6 py-2 pr-10 text-sm focus:outline-none focus:border-primary cursor-pointer hover:border-gray-300 transition-colors bg-no-repeat"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: `right 1rem center`,
              backgroundSize: `1.5em 1.5em`
            }}
          >
            <option value="newest">{t.sort.newest}</option>
            <option value="name-asc">{t.sort.nameAsc}</option>
            <option value="price-asc">{t.sort.priceAsc}</option>
            <option value="price-desc">{t.sort.priceDesc}</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square w-full rounded-2xl bg-gray-200 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {products.map((product) => {
              const primaryImage = getPrimaryImage(product);
              
              return (
                <Link href={`/products/${product.slug}`} key={product._id} className="group">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-[#F4F4F4]">
                    {primaryImage ? (
                      <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                        <span className="text-6xl font-bold text-primary/30">
                          {product.name[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    {/* Badges */}
                    {product.badges && product.badges.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {product.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className="bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold"
                          >
                            {badge.replace('-', ' ').toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stock Badge */}
                    {product.stock === 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {t.outOfStock}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center space-y-1">
                    <h3 className="font-title text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-primary font-medium">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <p className="text-gray-400 line-through text-sm">
                          ${product.compareAtPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
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
          <p className="text-gray-500 text-lg">{t.noProducts}</p>
        </div>
      )}
    </div>
    </ScrollMotion>
  );
};

export default ProductGrid;
