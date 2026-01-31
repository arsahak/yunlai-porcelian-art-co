"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Interfaces
export interface ProductImage {
  url: string;
  isPrimary: boolean;
}

export interface ColorVariant {
  color: string;
  colorCode?: string;
  images: string[];
}

export interface SizeVariant {
  size: string;
  price: number;
  stock: number;
  sku?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  category?: string;
  images: ProductImage[];
  colorVariants?: ColorVariant[];
  sizeVariants?: SizeVariant[];
  status: "active" | "draft" | "archived";
  featured: boolean;
  badges?: string[]; // Featured, Best Seller, New Arrival, Offer, Trending
  tags?: string[];
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  message?: string;
  data?: Product[];
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ProductResponse {
  success: boolean;
  message?: string;
  data?: Product;
  error?: string;
}

// Get all products with filters
export async function getProducts(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  category?: string;
  featured?: boolean;
  badges?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<ProductsResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.category) queryParams.append("category", params.category);
    if (params?.featured !== undefined) queryParams.append("featured", params.featured.toString());
    if (params?.badges) queryParams.append("badges", params.badges);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const response = await fetch(
      `${API_URL}/api/products?${queryParams.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // Don't cache for fresh data
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch products",
      data: [],
    };
  }
}

// Get single product by ID or slug
export async function getProduct(idOrSlug: string): Promise<ProductResponse> {
  try {
    console.log(`Fetching product: ${idOrSlug}`);
    const url = `${API_URL}/api/products/${idOrSlug}`;
    console.log(`Request URL: ${url}`);
    
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    console.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      return {
        success: false,
        error: `Failed to fetch product (${response.status})`,
      };
    }

    const data = await response.json();
    console.log(`Product data received:`, data);
    return data;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch product",
    };
  }
}

// Get featured products
export async function getFeaturedProducts(limit: number = 8): Promise<ProductsResponse> {
  return getProducts({
    featured: true,
    status: "active",
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
}

// Get products by category
export async function getProductsByCategory(
  category: string,
  limit?: number
): Promise<ProductsResponse> {
  return getProducts({
    category,
    status: "active",
    limit,
  });
}

// Get products by badge
export async function getProductsByBadge(
  badge: "featured" | "best-seller" | "new-arrival" | "offer" | "trending",
  limit: number = 12
): Promise<ProductsResponse> {
  return getProducts({
    badges: badge,
    status: "active",
    limit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
}

// Get new arrivals
export async function getNewArrivals(limit: number = 8): Promise<ProductsResponse> {
  return getProductsByBadge("new-arrival", limit);
}

// Get best sellers
export async function getBestSellers(limit: number = 8): Promise<ProductsResponse> {
  return getProductsByBadge("best-seller", limit);
}

// Get trending products
export async function getTrendingProducts(limit: number = 8): Promise<ProductsResponse> {
  return getProductsByBadge("trending", limit);
}

// Get products on offer
export async function getProductsOnOffer(limit: number = 8): Promise<ProductsResponse> {
  return getProductsByBadge("offer", limit);
}

// Get product categories
export async function getCategories(): Promise<{ success: boolean; data?: string[]; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/products/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch categories",
    };
  }
}

// Search products
export async function searchProducts(
  query: string,
  limit: number = 20
): Promise<ProductsResponse> {
  return getProducts({
    search: query,
    status: "active",
    limit,
  });
}
