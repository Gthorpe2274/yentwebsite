"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Tag,
  Search,
} from "lucide-react";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string | null;
  excerpt: string | null;
  publishedDate: string | null;
  author: string | null;
  createdAt: string;
}

const categories = [
  "AI Technology",
  "Digital Marketing",
  "Chatbots",
  "Analytics",
  "Automation",
  "Mobile Commerce",
];

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog/posts");
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadTime = (text: string) => {
    const wordCount = text?.split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  // Use placeholder images for posts without featured images
  const getImageUrl = (post: BlogPost, index: number) => {
    const placeholderImages = [
      "/images/hero-bg.jpg",
      "/images/chatbot-service.jpg",
      "/images/analytics-service.png",
      "/images/automation-service.png",
      "/images/mobile-commerce.png",
      "/images/team.png",
      "/images/office.png",
    ];
    return post.featuredImage || placeholderImages[index % placeholderImages.length];
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = filteredPosts[0];
  const recentPosts = filteredPosts.slice(1);

  return (
    <section id="blog" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-700 mb-4">Blog</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Insights & Resources
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay updated with the latest trends in AI marketing and digital transformation
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading articles...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <p className="text-slate-600 text-lg">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Card className="mb-12 overflow-hidden border-0 shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={getImageUrl(featuredPost, 0)}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge className="bg-red-100 text-red-700 w-fit mb-4">Featured</Badge>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 hover:text-red-600 transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {featuredPost.excerpt || "Read this insightful article..."}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      {featuredPost.author && (
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" /> {featuredPost.author}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />{" "}
                        {formatDate(featuredPost.publishedDate || featuredPost.createdAt)}
                      </span>
                    </div>
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white w-fit">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            )}

            {/* Blog Grid */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Search */}
                <div className="mb-8">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="search"
                      placeholder="Search articles..."
                      className="pl-10 border-slate-200 focus:border-sky-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {recentPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow group"
                    >
                      <div className="relative h-48">
                        <Image
                          src={getImageUrl(post, index)}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-red-600 transition-colors cursor-pointer line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {post.excerpt || "Read this insightful article..."}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          {post.author && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" /> {post.author}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />{" "}
                            {formatDate(post.publishedDate || post.createdAt)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                {recentPosts.length === 0 && searchQuery && (
                  <div className="text-center py-8 text-slate-600">
                    No posts found matching "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Categories */}
                <Card className="border-0 shadow-sm mb-6">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Tag className="h-4 w-4" /> Categories
                    </h4>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category}>
                          <a
                            href="#"
                            className="flex items-center justify-between text-slate-600 hover:text-red-600 transition-colors py-1"
                          >
                            <span>{category}</span>
                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="border-0 shadow-sm bg-slate-900 text-white">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">Subscribe to Our Newsletter</h4>
                    <p className="text-slate-400 text-sm mb-4">
                      Get the latest insights delivered to your inbox.
                    </p>
                    <Input
                      type="email"
                      placeholder="Your email"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 mb-3"
                    />
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Posts */}
                <Card className="border-0 shadow-sm mt-6">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Recent Posts</h4>
                    <div className="space-y-4">
                      {posts.slice(0, 3).map((post, index) => (
                        <a key={post.id} href="#" className="flex gap-3 group">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={getImageUrl(post, index)}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
                              {post.title}
                            </h5>
                            <p className="text-xs text-slate-500 mt-1">
                              {formatDate(post.publishedDate || post.createdAt)}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
