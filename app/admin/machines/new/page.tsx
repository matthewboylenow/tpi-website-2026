import { getCategories, getAllSubcategories } from "@/lib/data";
import { MachineForm } from "../MachineForm";

export default async function NewMachinePage() {
  const [categories, subcategories] = await Promise.all([
    getCategories(),
    getAllSubcategories(),
  ]);

  return (
    <MachineForm
      categories={categories}
      subcategories={subcategories}
    />
  );
}
