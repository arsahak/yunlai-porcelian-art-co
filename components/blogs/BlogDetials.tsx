"use client";

import { Blog, getBlog, getRecentBlogs } from '@/app/actions/blog';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BlogDetailsProps {
  slug: string;
}

const BlogDetails = ({ slug }: BlogDetailsProps) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch current blog
        const blogRes = await getBlog(slug);
        if (blogRes.success && blogRes.data) {
          setBlog(blogRes.data);
        }

        // Fetch recent blogs for sidebar
        const recentRes = await getRecentBlogs(5);
        if (recentRes.success && recentRes.data) {
          // Filter out current blog from recent list
          const filtered = recentRes.data.filter(b => b.slug !== slug);
          setRecentBlogs(filtered.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full aspect-video bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="space-y-4 pt-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            </div>
          </div>
          {/* Sidebar Skeleton */}
          <div className="hidden lg:block space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-title text-gray-900 mb-4">Blog Post Not Found</h2>
        <p className="text-gray-500 mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link 
          href="/blog" 
          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content - Left Side */}
        <div className="lg:col-span-8">
          <article>
            {/* Featured Image */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8 shadow-sm">
              {blog.featuredImage ? (
                <Image 
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                   <span className="text-6xl font-black text-gray-200">
                    {blog.title.charAt(0)}
                  </span>
                </div>
              )}
              {blog.category && (
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur text-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                      {blog.category}
                   </span>
                </div>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              </div>
              {blog.author && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {blog.author.charAt(0)}
                  </div>
                  <span>By {blog.author}</span>
                </div>
              )}
              {/* Estimated Read Time (Mock) */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>5 min read</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-title text-gray-900 mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* Content Body */}
            <div 
              className="prose prose-lg prose-gray max-w-none prose-headings:font-title prose-a:text-primary prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
            
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                   {blog.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm">
                        #{tag}
                      </span>
                   ))}
                </div>
              </div>
            )}
          </article>
        </div>

        {/* Sidebar - Right Side */}
        <div className="lg:col-span-4 lg:pl-8">
          <div className="sticky top-24 space-y-10">
            
            {/* Latest Posts Widget */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-2xl font-title text-gray-900 mb-6 flex items-center gap-3">
                 Latest Stories
                 <span className="w-12 h-1 bg-primary rounded-full block"></span>
              </h3>
              
              <div className="space-y-6">
                {recentBlogs.length > 0 ? (
                  recentBlogs.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post._id} className="group flex gap-4 items-start">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200">
                        {post.featuredImage ? (
                          <Image 
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold">
                            {post.title.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 py-1">
                        <span className="text-xs text-primary font-medium mb-1 block">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                        <h4 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                      </div>
                    </Link>
                  ))
                ) : (
                   <p className="text-gray-500 text-sm">No recent posts available.</p>
                )}
              </div>
              
               <div className="mt-8 pt-6 border-t border-gray-200">
                <Link href="/blog" className="flex items-center justify-between text-gray-900 font-medium group hover:text-primary transition-colors">
                  View All Posts
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Newsletter/Promo Widget Removed as per request */}

          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetails;
