import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/data";
import { BlogForm } from "../BlogForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await getBlogPostById(postId);

  if (!post) {
    notFound();
  }

  return <BlogForm post={post} />;
}
