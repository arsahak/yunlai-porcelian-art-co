"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  status: "active" | "inactive";
  productCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesResponse {
  success: boolean;
  message?: string;
  data?: Category[];
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface CategoryResponse {
  success: boolean;
  message?: string;
  data?: Category;
  error?: string;
}

// Get all active categories (public - no auth needed)
export async function getCategories(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<CategoriesResponse> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("status", "active"); // Only active categories
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);

    const response = await fetch(
      `${API_URL}/api/categories?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch categories",
      data: [],
    };
  }
}

// Get single category by slug or ID (public - no auth needed)
export async function getCategory(slugOrId: string): Promise<CategoryResponse> {
  try {
    const response = await fetch(`${API_URL}/api/categories/${slugOrId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching category:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch category",
    };
  }
}
