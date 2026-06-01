"use client";

import { getProduct, getProducts, Product } from "@/app/actions/products";
import ScrollMotion from "@/components/motion/ScrollMotion";
import { useLocale } from "@/lib/i18n";
import Translations from "@/messages/translations";
import { ChevronDown, ChevronUp, FileText, Package, Send, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductDetailsProps {
  slug: string;
}

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  const { locale } = useLocale();
  const t = Translations[locale].Product.Details;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [orderQty, setOrderQty] = useState(1000);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"description" | "specs" | "rfq">("description");

  // Strip HTML for short inline preview
  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  // Quick RFQ form state
  const [rfqSize, setRfqSize] = useState("");
  const [rfqColor, setRfqColor] = useState("");
  const [rfqQty, setRfqQty] = useState("1000");
  const [rfqDestPort, setRfqDestPort] = useState("");
  const [rfqNeedOEM, setRfqNeedOEM] = useState<"yes" | "no" | "">("");
  const [rfqContact, setRfqContact] = useState("");
  const [rfqMessage, setRfqMessage] = useState("");

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await getProduct(slug);
      if (response.success && response.data) {
        setProduct(response.data);

        if (response.data.colorVariants && response.data.colorVariants.length > 0) {
          const firstColor = response.data.colorVariants[0].color;
          setSelectedColor(firstColor);
          setRfqColor(firstColor);
        }

        if (response.data.sizeVariants && response.data.sizeVariants.length > 0) {
          const firstSize = response.data.sizeVariants[0];
          setSelectedSize(firstSize.size);
          setRfqSize(firstSize.size);
        }

        let productsToShow: Product[] = [];
        if (response.data.category) {
          const relatedResponse = await getProducts({
            category: response.data.category,
            status: "active",
            limit: 6,
          });
          if (relatedResponse.success && relatedResponse.data) {
            productsToShow = relatedResponse.data.filter((p) => p._id !== response.data?._id);
          }
        }

        if (productsToShow.length === 0) {
          const fallbackResponse = await getProducts({
            status: "active",
            limit: 6,
            sortBy: "createdAt",
            sortOrder: "desc",
          });
          if (fallbackResponse.success && fallbackResponse.data) {
            productsToShow = fallbackResponse.data.filter((p) => p._id !== response.data?._id);
          }
        }

        setRelatedProducts(productsToShow.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProductImages = () => {
    if (!product) return [];
    const images: string[] = [];
    if (product.images && product.images.length > 0) {
      images.push(...product.images.map((img) => img.url));
    }
    if (selectedColor && product.colorVariants) {
      const colorVariant = product.colorVariants.find((v) => v.color === selectedColor);
      if (colorVariant && colorVariant.images && colorVariant.images.length > 0) {
        return [...colorVariant.images, ...images];
      }
    }
    return images;
  };

  const images = getProductImages();

  const buildQuoteUrl = () => {
    if (!product) return "/contact-us";
    const parts = [
      `Product: ${product.name}`,
      selectedSize ? `Size: ${selectedSize}` : "",
      selectedColor ? `Color/Glaze: ${selectedColor}` : "",
      `Est. Order Qty: ${orderQty} pcs`,
    ].filter(Boolean).join(" | ");
    return `/contact-us?${new URLSearchParams({ subject: parts }).toString()}`;
  };

  const handleRFQSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const parts = [
      `Product: ${product.name}`,
      rfqSize ? `Size: ${rfqSize}` : "",
      rfqColor ? `Color/Glaze: ${rfqColor}` : "",
      rfqQty ? `Order Qty: ${rfqQty} pcs` : "",
      rfqDestPort ? `Destination: ${rfqDestPort}` : "",
      rfqNeedOEM ? `OEM Required: ${rfqNeedOEM.toUpperCase()}` : "",
      rfqContact ? `Contact: ${rfqContact}` : "",
    ].filter(Boolean).join(" | ");
    const params = new URLSearchParams({ subject: parts });
    if (rfqMessage) params.set("message", rfqMessage);
    router.push(`/contact-us?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="bg-white w-full">
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
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white w-full">
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.notFound}</h2>
        <p className="text-gray-600 mb-8">{t.notFoundDesc}</p>
        <Link href="/products" className="text-primary hover:underline">{t.browseAll}</Link>
      </div>
      </div>
    );
  }

  return (
    <ScrollMotion animation="fade-up" className="bg-white w-full">
      <div className="container mx-auto px-4 py-8 md:py-20">

        {/* Top Section: Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">

          {/* ── Left: Gallery ── */}
          <div className="space-y-4">
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

              {/* Product category badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges && product.badges.length > 0 &&
                  product.badges.map((badge, idx) => (
                    <span key={idx} className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {badge.replace("-", " ").toUpperCase()}
                    </span>
                  ))}
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 8).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-[#FAFAFA] rounded-md overflow-hidden border transition-all duration-200
                    ${selectedImage === index ? "border-primary ring-1 ring-primary" : "border-gray-200 hover:border-primary/50"}`}
                  >
                    <Image src={img} alt={`Thumbnail ${index + 1}`} fill unoptimized className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product Info + RFQ ── */}
          <div className="flex flex-col">

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-title text-gray-900 mb-4">{product.name}</h1>

            {/* B2B tag pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-full">MOQ: 1,000–2,000 pcs</span>
              <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full">OEM Customizable</span>
              <span className="bg-amber-50 text-amber-700 text-sm font-semibold px-3 py-1.5 rounded-full">~2 Month Lead Time</span>
              <span className="bg-green-50 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-full">Bulk Wholesale Only</span>
            </div>

            {/* Description teaser — full version in the tab section below */}
            {product.description && (
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {stripHtml(product.description).substring(0, 200)}
                {stripHtml(product.description).length > 200 && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("description");
                      document.getElementById("product-tabs")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-primary font-medium ml-1 hover:underline"
                  >
                    Read more ↓
                  </button>
                )}
              </p>
            )}

            {/* B2B Specs table */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 space-y-2 text-sm">
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">SKU:</span>{" "}
                {selectedSize && product.sizeVariants
                  ? product.sizeVariants.find((v) => v.size === selectedSize)?.sku || product.sku
                  : product.sku}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">Category:</span>{" "}{product.category}
              </p>
              {product.sizeVariants && product.sizeVariants.length > 0 && (
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">Available Sizes:</span>{" "}
                  {product.sizeVariants.map((v) => v.size).join("  ·  ")}
                </p>
              )}
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">Packaging:</span> Pallet / Wooden Crate
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">Container:</span> 20GP / 40HQ
              </p>
            </div>

            <div className="w-full h-px bg-gray-200 mb-6" />

            {/* Color selector */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-900 block mb-3">
                  {t.color}{" "}
                  <span className="font-normal text-gray-600">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.colorVariants.map((variant) => (
                    <button
                      key={variant.color}
                      onClick={() => { setSelectedColor(variant.color); setRfqColor(variant.color); setSelectedImage(0); }}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all hover:scale-110
                      ${selectedColor === variant.color ? "ring-2 ring-offset-2 ring-primary border-primary" : "border-gray-300"}`}
                      style={{ backgroundColor: variant.colorCode || "#CCCCCC" }}
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

            {/* Size selector */}
            {product.sizeVariants && product.sizeVariants.length > 0 && (
              <div className="mb-6">
                <span className="text-sm font-semibold text-gray-900 block mb-3">
                  {t.size}{" "}
                  <span className="font-normal text-gray-600">{selectedSize}</span>
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.sizeVariants.map((variant) => (
                    <button
                      key={variant.size}
                      onClick={() => { setSelectedSize(variant.size); setRfqSize(variant.size); }}
                      className={`min-w-16 px-4 py-3 rounded-lg border-2 flex flex-col items-center justify-center text-sm transition-all
                      ${selectedSize === variant.size
                        ? "border-primary bg-primary/5 text-primary font-semibold ring-2 ring-primary ring-offset-1"
                        : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"}
                      ${variant.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={variant.stock === 0}
                    >
                      <span className="font-medium">{variant.size}</span>
                      {variant.stock === 0 && <span className="text-[10px] text-red-500 mt-1">Out</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Estimated Order Qty */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-900 block mb-2">
                Estimated Order Qty
                <span className="text-xs font-normal text-gray-500 ml-1">(MOQ: 1,000–2,000 pcs)</span>
              </label>
              <div className="relative w-36">
                <input
                  type="number"
                  value={orderQty}
                  onChange={(e) => setOrderQty(Math.max(1000, Number(e.target.value)))}
                  className="w-full h-12 border border-gray-300 rounded-lg pl-4 pr-8 text-center text-gray-900 focus:outline-none focus:border-primary"
                  min="1000"
                  step="500"
                />
                <div className="absolute right-1 top-1 bottom-1 flex flex-col border-l border-gray-200 w-6">
                  <button
                    type="button"
                    onClick={() => setOrderQty((q) => q + 500)}
                    className="flex-1 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-tr"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderQty((q) => Math.max(1000, q - 500))}
                    className="flex-1 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-br"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <Link
                href={buildQuoteUrl()}
                className="flex-1 h-12 bg-gradient-to-b from-[#3DA754] to-[#28883D] hover:from-[#44bd5e] hover:to-[#2f9e47] text-white font-semibold rounded-full shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Request Quote (Bulk Order)
              </Link>
              <Link
                href={buildQuoteUrl()}
                className="flex-1 h-12 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Add to Inquiry List
              </Link>
            </div>

            {/* Trust line */}
            <p className="text-xs text-gray-400 text-center mb-8">
              MOQ 1,000–2,000 pcs &nbsp;·&nbsp; Lead time ~60 days &nbsp;·&nbsp; OEM / Custom logo available
            </p>

            {/* RFQ shortcut — opens the RFQ tab below */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("rfq");
                document.getElementById("product-tabs")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full h-11 border border-dashed border-primary text-primary text-sm font-semibold rounded-full hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              Fill in detailed RFQ ↓
            </button>

          </div>
        </div>

        {/* ── Tabbed Content Section ── */}
        <div id="product-tabs" className="border-t border-gray-100 pt-12 mb-16">

          {/* Tab Nav */}
          <div className="flex gap-1 mb-8 border-b border-gray-200">
            {[
              { key: "description", label: "Description", icon: <FileText className="w-4 h-4" /> },
              { key: "specs",       label: "Specifications", icon: <Package className="w-4 h-4" /> },
              { key: "rfq",         label: "Quick RFQ", icon: <Send className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="max-w-3xl">
              {product.description ? (
                <div
                  className="product-content"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p className="text-gray-400 italic">No description available.</p>
              )}
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === "specs" && (
            <div className="max-w-2xl">
              <div className="rounded-xl overflow-hidden border border-gray-200 text-sm">
                {[
                  {
                    label: "SKU",
                    value: selectedSize && product.sizeVariants
                      ? product.sizeVariants.find((v) => v.size === selectedSize)?.sku || product.sku
                      : product.sku,
                  },
                  { label: "Category", value: product.category },
                  product.sizeVariants && product.sizeVariants.length > 0
                    ? { label: "Available Sizes", value: product.sizeVariants.map((v) => v.size).join("  ·  ") }
                    : null,
                  product.colorVariants && product.colorVariants.length > 0
                    ? { label: "Available Colors", value: product.colorVariants.map((v) => v.color).join("  ·  ") }
                    : null,
                  { label: "MOQ", value: "1,000 – 2,000 pcs" },
                  { label: "Lead Time", value: "~60 days" },
                  { label: "OEM / Custom Logo", value: "Available" },
                  { label: "Packaging", value: "Pallet / Wooden Crate" },
                  { label: "Container", value: "20GP / 40HQ" },
                ].filter(Boolean).map((row, idx) => (
                  <div
                    key={idx}
                    className={`flex ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100 last:border-0`}
                  >
                    <span className="w-44 shrink-0 px-5 py-3.5 font-semibold text-gray-900 border-r border-gray-100">
                      {row!.label}
                    </span>
                    <span className="px-5 py-3.5 text-gray-600">{row!.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RFQ Tab — moved from inline */}
          {activeTab === "rfq" && (
            <div className="max-w-xl">
              <p className="text-sm text-gray-500 mb-6">
                Fill in your requirements and we&apos;ll respond within 24 hours.
              </p>
              <form onSubmit={handleRFQSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Size / Model</label>
                    <input type="text" value={rfqSize} onChange={(e) => setRfqSize(e.target.value)}
                      placeholder="e.g. 38×38 cm"
                      className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 focus:outline-none focus:border-primary bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Color / Glaze</label>
                    <input type="text" value={rfqColor} onChange={(e) => setRfqColor(e.target.value)}
                      placeholder="e.g. Blue Glaze"
                      className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 focus:outline-none focus:border-primary bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Order Qty <span className="text-gray-400 font-normal">(MOQ: 1,000 pcs)</span>
                    </label>
                    <input type="number" value={rfqQty} onChange={(e) => setRfqQty(e.target.value)}
                      placeholder="e.g. 2000" min="1000"
                      className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 focus:outline-none focus:border-primary bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Destination Country / Port</label>
                    <input type="text" value={rfqDestPort} onChange={(e) => setRfqDestPort(e.target.value)}
                      placeholder="e.g. Los Angeles, USA"
                      className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 focus:outline-none focus:border-primary bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Need OEM / Custom Logo?</label>
                    <div className="flex gap-3 mt-1">
                      {(["yes", "no"] as const).map((opt) => (
                        <button type="button" key={opt} onClick={() => setRfqNeedOEM(opt)}
                          className={`flex-1 h-10 rounded-lg border-2 text-sm font-medium capitalize transition-all
                          ${rfqNeedOEM === opt ? "border-primary bg-primary/10 text-primary" : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">WhatsApp / Email</label>
                    <input type="text" value={rfqContact} onChange={(e) => setRfqContact(e.target.value)}
                      placeholder="+1 234 567 890 or email"
                      className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 focus:outline-none focus:border-primary bg-white" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Message <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea value={rfqMessage} onChange={(e) => setRfqMessage(e.target.value)}
                    placeholder="Special requirements, certifications, packaging, reference images, etc."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-primary bg-white resize-none" />
                </div>
                <button type="submit"
                  className="w-full h-12 bg-gradient-to-b from-[#3DA754] to-[#28883D] hover:from-[#44bd5e] hover:to-[#2f9e47] text-white font-semibold rounded-full shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-3xl md:text-4xl font-title text-gray-900 text-center mb-12">
              {t.relatedTitle}{" "}
              <span className="text-primary">{t.relatedSubtitle}</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {relatedProducts.map((item) => {
                const primaryImage =
                  item.images?.find((img) => img.isPrimary)?.url ||
                  item.images?.[0]?.url;

                return (
                  <Link
                    href={`/products/${item.slug}`}
                    key={item._id}
                    className="group flex flex-col items-center"
                  >
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
                    <p className="text-xs text-gray-500 font-medium mt-1">MOQ 1,000+ pcs</p>
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
