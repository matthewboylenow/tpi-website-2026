"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ArrowLeft, Save, Eye } from "lucide-react";
import type { BlogPost } from "@/lib/schema";
import "@/components/admin/RichTextEditor.css";

interface BlogFormProps {
  post?: BlogPost;
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const isEditing = !!post;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    featuredImageUrl: post?.featuredImageUrl || "",
    author: post?.author || "Taylor Products Team",
    isPublished: post?.isPublished ?? false,
    isWhatsNew: post?.isWhatsNew ?? false,
    metaTitle: post?.metaTitle || "",
    metaDescription: post?.metaDescription || "",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug || generateSlug(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEditing ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.isPublished ? new Date().toISOString() : null,
        }),
      });

      if (response.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to save post");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 text-[var(--gray-500)] hover:text-[var(--navy-800)] hover:bg-[var(--gray-100)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
              {isEditing ? "Edit Post" : "New Post"}
            </h1>
            <p className="text-[var(--gray-600)] mt-1">
              {isEditing ? `Editing: ${post.title}` : "Create a new blog post"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing && post.isPublished && (
            <Link href={`/blog/${post.slug}`} target="_blank">
              <Button type="button" variant="secondary">
                <Eye className="w-4 h-4" />
                View Post
              </Button>
            </Link>
          )}
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            <Save className="w-4 h-4" />
            {isSubmitting ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Content
            </h2>
            <div className="space-y-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                placeholder="Post title"
              />
              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                required
                placeholder="post-url-slug"
                hint="URL-friendly version of the title"
              />
              <Textarea
                label="Excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="Brief summary of the post"
                hint="Displayed in post listings and search results"
              />
              <div>
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
                  Content
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, content: value }))
                  }
                  placeholder="Start writing your post..."
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              SEO
            </h2>
            <div className="space-y-4">
              <Input
                label="Meta Title"
                value={formData.metaTitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))
                }
                placeholder="Custom page title for search engines"
              />
              <Textarea
                label="Meta Description"
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    metaDescription: e.target.value,
                  }))
                }
                placeholder="Brief description for search engine results"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Publish Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPublished: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)] focus:ring-[var(--blue-500)]"
                />
                <label
                  htmlFor="isPublished"
                  className="text-sm font-medium text-[var(--gray-700)]"
                >
                  Published
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isWhatsNew"
                  checked={formData.isWhatsNew}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isWhatsNew: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-[var(--gray-300)] text-[var(--blue-500)] focus:ring-[var(--blue-500)]"
                />
                <label
                  htmlFor="isWhatsNew"
                  className="text-sm font-medium text-[var(--gray-700)]"
                >
                  Show in &quot;What&apos;s New&quot;
                </label>
              </div>
            </div>
          </div>

          {/* Author & Image */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]">
            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] mb-4">
              Details
            </h2>
            <div className="space-y-4">
              <Input
                label="Author"
                value={formData.author}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, author: e.target.value }))
                }
                placeholder="Author name"
              />
              <ImageUpload
                label="Featured Image"
                value={formData.featuredImageUrl}
                onChange={(url) =>
                  setFormData((prev) => ({
                    ...prev,
                    featuredImageUrl: url,
                  }))
                }
                folder="blog"
                hint="Recommended: 1200x630 pixels"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
