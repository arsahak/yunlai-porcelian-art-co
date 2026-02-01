"use client";

import { getProduct, getProducts, Product } from '@/app/actions/products';
import ScrollMotion from '@/components/motion/ScrollMotion';
import { useLocale } from '@/lib/i18n';
import Translations from '@/messages/translations';
import { ChevronDown, ChevronUp, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProductDetailsProps {
  slug: string;
}

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  const { locale } = useLocale();
  const t = Translations[locale].Product.Details;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  
  // Track current price and stock based on selected variant
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [currentStock, setCurrentStock] = useState<number>(0);
  const [currentComparePrice, setCurrentComparePrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  // Update price and stock when size selection changes
  useEffect(() => {
    if (!product) return;

    if (selectedSize && product.sizeVariants && product.sizeVariants.length > 0) {
      // Find the selected size variant
      const sizeVariant = product.sizeVariants.find(v => v.size === selectedSize);
      if (sizeVariant) {
        setCurrentPrice(sizeVariant.price);
        setCurrentStock(sizeVariant.stock);
        // For size variants, use base compareAtPrice if available
        setCurrentComparePrice(product.compareAtPrice);
      }
    } else {
      // Use base price if no size variant selected
      setCurrentPrice(product.price);
      setCurrentStock(product.stock);
      setCurrentComparePrice(product.compareAtPrice);
    }
  }, [selectedSize, product]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      // Fetch main product
      const response = await getProduct(slug);
      
      if (response.success && response.data) {
        setProduct(response.data);
        
        // Initialize prices
        setCurrentPrice(response.data.price);
        setCurrentStock(response.data.stock);
        setCurrentComparePrice(response.data.compareAtPrice);
        
        // Set default color variant if available
        if (response.data.colorVariants && response.data.colorVariants.length > 0) {
          setSelectedColor(response.data.colorVariants[0].color);
        }
        
        // Set default size variant if available
        if (response.data.sizeVariants && response.data.sizeVariants.length > 0) {
          const firstSize = response.data.sizeVariants[0];
          setSelectedSize(firstSize.size);
          setCurrentPrice(firstSize.price);
          setCurrentStock(firstSize.stock);
        }

        // Fetch related products from same category
        if (response.data.category) {
          const relatedResponse = await getProducts({
            category: response.data.category,
            status: 'active',
            limit: 5,
          });
          
          if (relatedResponse.success && relatedResponse.data) {
            // Filter out current product
            const filtered = relatedResponse.data.filter(p => p._id !== response.data?._id);
            setRelatedProducts(filtered.slice(0, 5));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get all product images (combine base images with color variant images)
  const getProductImages = () => {
    if (!product) return [];
    
    const images: string[] = [];
    
    // Add base product images
    if (product.images && product.images.length > 0) {
      images.push(...product.images.map(img => img.url));
    }
    
    // If a color is selected, show that color's images
    if (selectedColor && product.colorVariants) {
      const colorVariant = product.colorVariants.find(v => v.color === selectedColor);
      if (colorVariant && colorVariant.images && colorVariant.images.length > 0) {
        // Prepend color variant images
        return [...colorVariant.images, ...images];
      }
    }
    
    return images;
  };

  const images = getProductImages();

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (currentComparePrice && currentComparePrice > currentPrice) {
      return Math.round(((currentComparePrice - currentPrice) / currentComparePrice) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square w-full bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.notFound}</h2>
        <p className="text-gray-600 mb-8">{t.notFoundDesc}</p>
        <Link href="/products" className="text-primary hover:underline">
          {t.browseAll}
        </Link>
      </div>
    );
  }

  const discountPercent = getDiscountPercentage();

  return (
    <ScrollMotion animation="fade-up">
    <div className="container mx-auto px-4 py-8 md:py-20">
      {/* Top Section: Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        
        {/* Left: Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square w-full bg-[#FAFAFA] rounded-lg overflow-hidden border border-gray-100">
            {images.length > 0 ? (
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                unoptimized
                className="object-contain p-8"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                <span className="text-8xl font-bold text-primary/30">
                  {product.name[0].toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badges && product.badges.length > 0 && product.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold"
                >
                  {badge.replace('-', ' ').toUpperCase()}
                </span>
              ))}
              
              {/* Discount Badge */}
              {discountPercent > 0 && (
                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  -{discountPercent}% {t.off}
                </span>
              )}
            </div>

            {/* Stock Badge */}
            {currentStock === 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                {t.outOfStock.toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.slice(0, 8).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-[#FAFAFA] rounded-md overflow-hidden border transition-all duration-200 
                    ${selectedImage === index ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50'}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col h-full">
          <h1 className="text-3xl md:text-4xl font-title text-gray-900 mb-4">
            {product.name}
          </h1>
          
          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">
              ${currentPrice.toFixed(2)}
            </span>
            {currentComparePrice && currentComparePrice > currentPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ${currentComparePrice.toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                  {t.save} ${(currentComparePrice - currentPrice).toFixed(2)}
                </span>
              </>
            )}
          </div>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Stock & SKU Info */}
          <div className="space-y-1 text-sm mb-8">
            <p className="text-gray-700">
              <span className="font-medium">{t.sku}</span> {selectedSize && product.sizeVariants ? 
                product.sizeVariants.find(v => v.size === selectedSize)?.sku || product.sku 
                : product.sku}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">{t.category}</span> {product.category}
            </p>
            <p className={`font-medium ${currentStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currentStock > 0 ? (
                <>
                  {currentStock} {t.inStock}
                  {currentStock <= 10 && <span className="text-orange-500 ml-2">{t.lowStock}</span>}
                </>
              ) : (
                t.outOfStock
              )}
            </p>
          </div>

          <div className="w-full h-px bg-gray-200 mb-8" />

          {/* Options */}
          <div className="space-y-8">
            {/* Colors */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div>
                <span className="text-sm font-semibold text-gray-900 block mb-3">
                  {t.color} <span className="font-normal text-gray-600">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.colorVariants.map((variant) => (
                    <button
                      key={variant.color}
                      onClick={() => {
                        setSelectedColor(variant.color);
                        setSelectedImage(0); // Reset to first image when color changes
                      }}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all hover:scale-110 
                        ${selectedColor === variant.color ? 'ring-2 ring-offset-2 ring-primary border-primary' : 'border-gray-300'}`}
                      style={{ backgroundColor: variant.colorCode || '#CCCCCC' }}
                      aria-label={`Select ${variant.color}`}
                      title={variant.color}
                    >
                      {selectedColor === variant.color && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizeVariants && product.sizeVariants.length > 0 && (
              <div>
                <span className="text-sm font-semibold text-gray-900 block mb-3">
                  {t.size} <span className="font-normal text-gray-600">{selectedSize}</span>
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.sizeVariants.map((variant) => (
                    <button
                      key={variant.size}
                      onClick={() => setSelectedSize(variant.size)}
                      className={`min-w-[4rem] px-4 py-3 rounded-lg border-2 flex flex-col items-center justify-center text-sm transition-all
                        ${selectedSize === variant.size 
                          ? 'border-primary bg-primary/5 text-primary font-semibold ring-2 ring-primary ring-offset-1' 
                          : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'}
                        ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={variant.stock === 0}
                    >
                      <span className="font-medium">{variant.size}</span>
                      <span className="text-xs mt-1">
                        ${variant.price.toFixed(2)}
                      </span>
                      {variant.stock === 0 && (
                        <span className="text-[10px] text-red-500 mt-1">Out</span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t.priceVaries}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              {/* Quantity Input */}
              <div className="relative w-24">
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(currentStock, Number(e.target.value))))}
                  className="w-full h-12 border border-gray-300 rounded pl-4 pr-8 text-center text-gray-900 focus:outline-none focus:border-primary"
                  min="1"
                  max={currentStock}
                  disabled={currentStock === 0}
                />
                <div className="absolute right-1 top-1 bottom-1 flex flex-col border-l border-gray-200 w-6">
                  <button 
                    onClick={() => setQuantity(q => Math.min(currentStock, q + 1))}
                    className="flex-1 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-tr disabled:opacity-50"
                    disabled={currentStock === 0}
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="flex-1 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-br disabled:opacity-50"
                    disabled={currentStock === 0}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Contact Button */}
              <Link 
                href={`/contact-us?subject=Inquiry about ${product.name}${selectedSize ? ` - Size: ${selectedSize}` : ''}${selectedColor ? ` - Color: ${selectedColor}` : ''}`}
                className="flex-1 h-12 bg-gradient-to-b from-[#3DA754] to-[#28883D] hover:from-[#44bd5e] hover:to-[#2f9e47] text-white font-medium rounded-full shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {t.contactUs}
              </Link>

              {/* Wishlist Button */}
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 pt-16">
          <h2 className="text-3xl md:text-4xl font-title text-center mb-12">
            {t.relatedTitle} <span className="text-primary">{t.relatedSubtitle}</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {relatedProducts.map((item) => {
              const primaryImage = item.images?.find(img => img.isPrimary)?.url || item.images?.[0]?.url;
              
              return (
                <Link href={`/products/${item.slug}`} key={item._id} className="group flex flex-col items-center">
                  <div className="relative w-full aspect-[4/5] bg-[#FAFAFA] rounded-xl overflow-hidden mb-3">
                    {primaryImage ? (
                      <Image
                        src={primaryImage}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                        <span className="text-4xl font-bold text-primary/30">
                          {item.name[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-title text-gray-900 group-hover:text-primary transition-colors text-center line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">${item.price.toFixed(2)}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
    </ScrollMotion>
  );
};


export default ProductDetails;
