import Link from "next/link";
import { getAllBlogPostsAdmin } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, FileText, Trash2 } from "lucide-react";
import { DeleteBlogButton } from "./DeleteBlogButton";

export default async function BlogAdminPage() {
  const posts = await getAllBlogPostsAdmin();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
            Blog Posts
          </h1>
          <p className="text-[var(--gray-600)] mt-1">
            Manage {posts.length} blog post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="primary">
            <Plus className="w-5 h-5" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-[var(--gray-200)] text-center">
          <FileText className="w-12 h-12 text-[var(--gray-300)] mx-auto mb-4" />
          <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-2">
            No Posts Yet
          </h2>
          <p className="text-[var(--gray-500)] mb-6">
            Create your first blog post to get started.
          </p>
          <Link href="/admin/blog/new">
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Create Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)]">
          <div className="divide-y divide-[var(--gray-200)]">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--gray-50)] transition-colors"
              >
                {/* Title & excerpt */}
                <div className="flex-1 min-w-0">
                  <p className="font-[family-name:var(--font-heading)] font-semibold text-sm text-[var(--navy-800)] truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-[var(--gray-500)] truncate">
                    {post.excerpt || "No excerpt"}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {post.isPublished ? (
                    <Badge variant="success">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                  {post.isWhatsNew && (
                    <Badge variant="primary">What&apos;s New</Badge>
                  )}
                </div>

                {/* Date */}
                <span className="text-xs text-[var(--gray-500)] shrink-0 w-20 text-right hidden sm:block">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : "—"}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {post.isPublished && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1.5 text-[var(--gray-500)] hover:text-[var(--blue-500)] hover:bg-[var(--blue-50)] rounded-lg transition-colors"
                      title="View on site"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  )}
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="p-1.5 text-[var(--gray-500)] hover:text-[var(--blue-500)] hover:bg-[var(--blue-50)] rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <DeleteBlogButton id={post.id} title={post.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
