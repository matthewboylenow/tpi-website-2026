import { notFound } from "next/navigation";
import { getCategoryById, getSubcategoriesByCategoryId } from "@/lib/data";
import { CategoryForm } from "../CategoryForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const categoryId = parseInt(id, 10);

  if (isNaN(categoryId)) {
    notFound();
  }

  const [category, subcategories] = await Promise.all([
    getCategoryById(categoryId),
    getSubcategoriesByCategoryId(categoryId),
  ]);

  if (!category) {
    notFound();
  }

  return <CategoryForm category={category} subcategories={subcategories} />;
}
