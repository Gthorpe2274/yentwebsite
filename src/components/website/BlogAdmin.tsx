"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  Link as LinkIcon,
  ImageIcon,
  Upload,
  Loader2,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string | null;
  body: string;
  excerpt: string | null;
  publishedDate: string | null;
  isPublished: boolean;
  allowComments: boolean;
  author: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ImageItem {
  name: string;
  url: string;
  path: string;
  createdAt?: string;
  size?: number;
}

const API_KEY = "y-enterprises#2024";

export default function BlogAdmin() {
  // Blog admin states
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  // Image library states
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    featuredImage: "",
    body: "",
    excerpt: "",
    publishedDate: "",
    isPublished: false,
    allowComments: true,
    author: "",
  });

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blog/posts", {
        headers: {
          "X-API-Key": API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      setLoadingImages(true);
      const response = await fetch("/api/images/list");

      const data = await response.json();
      if (data.success) {
        setImages(data.images || []);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData({ ...formData, featuredImage: data.url });
        fetchImages(); // Refresh image library
        alert("Image uploaded successfully!");
      } else {
        alert("Error: " + (data.error || "Failed to upload image"));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    setFormData({ ...formData, featuredImage: imageUrl });
    setShowImageLibrary(false);
  };

  const openImageLibrary = () => {
    setShowImageLibrary(true);
    fetchImages();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!formData.slug.trim()) {
      alert("Please enter a slug");
      return;
    }
    if (!formData.body.trim()) {
      alert("Please enter post content");
      return;
    }

    try {
      setSaving(true);
      const url = editingPost
        ? `/api/admin/blog/posts/${editingPost.id}`
        : "/api/admin/blog/posts";

      const method = editingPost ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + (errorData.error || `HTTP ${response.status}`));
        return;
      }

      const data = await response.json();

      if (data.success) {
        alert(editingPost ? "Post updated successfully!" : "Post created successfully!");
        resetForm();
        fetchAllPosts();
      } else {
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      featuredImage: post.featuredImage || "",
      body: post.body,
      excerpt: post.excerpt || "",
      publishedDate: post.publishedDate || "",
      isPublished: post.isPublished,
      allowComments: post.allowComments,
      author: post.author || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/admin/blog/posts/${id}`, {
        method: "DELETE",
        headers: {
          "X-API-Key": API_KEY,
        },
      });

      const data = await response.json();

      if (data.success) {
        alert("Post deleted successfully");
        fetchAllPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      featuredImage: "",
      body: "",
      excerpt: "",
      publishedDate: "",
      isPublished: false,
      allowComments: true,
      author: "",
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const insertTag = (startTag: string, endTag: string) => {
    const textarea = document.getElementById("post-body") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.body;

    const newText = text.substring(0, start) + startTag + text.substring(start, end) + endTag + text.substring(end);
    setFormData({ ...formData, body: newText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + startTag.length, end + startTag.length);
    }, 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
              <p className="text-slate-600 mt-1">Create and manage blog posts for Y Enterprises</p>
            </div>
            <a href="/" className="text-sky-600 hover:text-sky-700 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </a>
          </div>

          {/* Create New Post Button */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-4">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-sky-600 hover:bg-sky-700"
              >
                {showForm ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Create/Edit Form */}
          {showForm && (
            <Card className="mb-6 shadow-lg">
              <CardHeader>
                <CardTitle>{editingPost ? "Edit Post" : "Create New Post"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          title: e.target.value,
                          slug: generateSlug(e.target.value),
                        });
                      }}
                      required
                      className="mt-1"
                      placeholder="Enter post title"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                      className="mt-1"
                      placeholder="url-friendly-slug"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      URL: /blog/{formData.slug || "your-slug"}
                    </p>
                  </div>

                  {/* Featured Image with Library */}
                  <div>
                    <Label htmlFor="featuredImage">Featured Image</Label>
                    <div className="flex flex-col gap-3 mt-1">
                      <div className="flex gap-2">
                        <Input
                          id="featuredImage"
                          value={formData.featuredImage}
                          onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                          className="flex-1"
                          placeholder="Image URL or select from library"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={openImageLibrary}
                          className="whitespace-nowrap"
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Library
                        </Button>
                      </div>
                      
                      {/* Upload button */}
                      <div className="flex items-center gap-4">
                        <label className="relative cursor-pointer">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                          <span className={`inline-flex items-center px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors ${uploadingImage ? "opacity-50 cursor-not-allowed" : ""}`}>
                            {uploadingImage ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Image
                              </>
                            )}
                          </span>
                        </label>
                        <span className="text-xs text-slate-500">Max size: 5MB (JPG, PNG, WebP, GIF)</span>
                      </div>

                      {/* Image Preview */}
                      {formData.featuredImage && (
                        <div className="mt-2">
                          <p className="text-sm text-slate-600 mb-1">Preview:</p>
                          <img
                            src={formData.featuredImage}
                            alt="Preview"
                            className="max-w-full h-40 object-cover rounded-lg border border-slate-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body with formatting toolbar */}
                  <div>
                    <Label htmlFor="body">Body Content *</Label>
                    <div className="flex flex-wrap gap-1 mt-1 mb-2 p-2 bg-slate-100 rounded-t-lg border border-b-0 border-slate-200">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertTag("<b>", "</b>")}
                        title="Bold"
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertTag("<i>", "</i>")}
                        title="Italic"
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertTag("<u>", "</u>")}
                        title="Underline"
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                      <div className="w-px bg-slate-300 mx-1" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertTag("<h2>", "</h2>")}
                        title="Heading 2"
                      >
                        <Heading2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertTag("<h3>", "</h3>")}
                        title="Heading 3"
                      >
                        <Heading3 className="h-4 w-4" />
                      </Button>
                      <div className="w-px bg-slate-300 mx-1" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertTag("<ul>\n  <li>", "</li>\n</ul>")}
                        title="List"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const url = window.prompt("Enter URL:");
                          if (url)
                            insertTag(
                              `<a href="${url}" class="text-sky-600 hover:underline">`,
                              "</a>"
                            );
                        }}
                        title="Link"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      id="post-body"
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      required
                      className="font-mono text-sm min-h-[200px] rounded-t-none"
                      placeholder="Write your blog post content here..."
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="mt-1"
                      placeholder="Brief summary of the post..."
                      rows={3}
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="mt-1"
                      placeholder="Author name"
                    />
                  </div>

                  {/* Published Date */}
                  <div>
                    <Label htmlFor="publishedDate">Published Date</Label>
                    <Input
                      id="publishedDate"
                      type="date"
                      value={formData.publishedDate}
                      onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPublished"
                        checked={formData.isPublished}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isPublished: checked as boolean })
                        }
                      />
                      <Label htmlFor="isPublished" className="font-normal">
                        Published
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowComments"
                        checked={formData.allowComments}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, allowComments: checked as boolean })
                        }
                      />
                      <Label htmlFor="allowComments" className="font-normal">
                        Allow Comments
                      </Label>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving
                        ? "Saving..."
                        : editingPost
                        ? "Update Post"
                        : "Create Post"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Posts List */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>All Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
                  <p className="text-slate-600 mt-4">Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8 text-slate-600">
                  No posts yet. Create your first post!
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-slate-800">
                              {post.title}
                            </h3>
                            <Badge
                              variant={post.isPublished ? "default" : "secondary"}
                              className={
                                post.isPublished
                                  ? "bg-green-100 text-green-700"
                                  : "bg-slate-100 text-slate-600"
                              }
                            >
                              {post.isPublished ? "Published" : "Draft"}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">Slug: {post.slug}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            Created: {formatDate(post.createdAt)}
                            {post.author && ` • By ${post.author}`}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(post)}
                            className="text-sky-600 border-sky-200 hover:bg-sky-50"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Library Modal */}
      {showImageLibrary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Image Library</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowImageLibrary(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 border-b border-slate-200">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
                <span className={`inline-flex items-center px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors ${uploadingImage ? "opacity-50 cursor-not-allowed" : ""}`}>
                  {uploadingImage ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New Image
                    </>
                  )}
                </span>
              </label>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loadingImages ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-sky-600 mx-auto" />
                  <p className="text-slate-600 mt-4">Loading images...</p>
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-8 text-slate-600">
                  No images yet. Upload your first image!
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <button
                      key={image.path}
                      type="button"
                      onClick={() => handleSelectImage(image.url)}
                      className="group relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-sky-500 focus:outline-none focus:border-sky-500 transition-all"
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-white text-xs truncate">{image.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
              <Button variant="outline" onClick={() => setShowImageLibrary(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
