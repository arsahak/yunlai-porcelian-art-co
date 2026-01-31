"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Interfaces
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  body: string;
  excerpt?: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

export interface BlogsResponse {
  success: boolean;
  message?: string;
  data?: Blog[];
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface BlogResponse {
  success: boolean;
  message?: string;
  data?: Blog;
  error?: string;
}

// Get all blogs with filters
export async function getBlogs(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  category?: string;
  featured?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<BlogsResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.category) queryParams.append("category", params.category);
    if (params?.featured !== undefined) queryParams.append("featured", params.featured.toString());
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const response = await fetch(
      `${API_URL}/api/blogs?${queryParams.toString()}`,
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
    console.error("Error fetching blogs:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch blogs",
      data: [],
    };
  }
}

// Get single blog by ID or slug
export async function getBlog(idOrSlug: string): Promise<BlogResponse> {
  try {
    const response = await fetch(`${API_URL}/api/blogs/${idOrSlug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch blog",
    };
  }
}

// Get published blogs
export async function getPublishedBlogs(
  page: number = 1,
  limit: number = 10
): Promise<BlogsResponse> {
  return getBlogs({
    status: "published",
    page,
    limit,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });
}

// Get featured blogs
export async function getFeaturedBlogs(limit: number = 6): Promise<BlogsResponse> {
  return getBlogs({
    featured: true,
    status: "published",
    limit,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });
}

// Get blogs by category
export async function getBlogsByCategory(
  category: string,
  page: number = 1,
  limit: number = 10
): Promise<BlogsResponse> {
  return getBlogs({
    category,
    status: "published",
    page,
    limit,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });
}

// Get recent blogs
export async function getRecentBlogs(limit: number = 5): Promise<BlogsResponse> {
  return getBlogs({
    status: "published",
    limit,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });
}

// Get blog categories
export async function getCategories(): Promise<{ success: boolean; data?: string[]; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/blogs/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching blog categories:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch categories",
    };
  }
}

// Search blogs
export async function searchBlogs(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<BlogsResponse> {
  return getBlogs({
    search: query,
    status: "published",
    page,
    limit,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });
}

// Get blogs by tag
export async function getBlogsByTag(
  tag: string,
  page: number = 1,
  limit: number = 10
): Promise<BlogsResponse> {
  try {
    const queryParams = new URLSearchParams({
      status: "published",
      page: page.toString(),
      limit: limit.toString(),
      search: tag, // Search will include tags
      sortBy: "publishedAt",
      sortOrder: "desc",
    });

    const response = await fetch(
      `${API_URL}/api/blogs?${queryParams.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching blogs by tag:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch blogs by tag",
      data: [],
    };
  }
}

// Get related blogs (by category, excluding current blog)
export async function getRelatedBlogs(
  currentBlogId: string,
  category: string,
  limit: number = 3
): Promise<BlogsResponse> {
  try {
    const response = await getBlogsByCategory(category, 1, limit + 5); // Get more to filter
    
    if (response.success && response.data) {
      // Filter out the current blog
      const relatedBlogs = response.data
        .filter(blog => blog._id !== currentBlogId)
        .slice(0, limit);
      
      return {
        success: true,
        data: relatedBlogs,
      };
    }
    
    return response;
  } catch (error: any) {
    console.error("Error fetching related blogs:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch related blogs",
      data: [],
    };
  }
}
