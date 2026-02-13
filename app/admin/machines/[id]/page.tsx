import { notFound } from "next/navigation";
import { getMachineByIdWithCategories, getCategories, getAllSubcategories } from "@/lib/data";
import { MachineForm } from "../MachineForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMachinePage({ params }: PageProps) {
  const { id } = await params;
  const machineId = parseInt(id, 10);

  if (isNaN(machineId)) {
    notFound();
  }

  const [machine, categories, subcategories] = await Promise.all([
    getMachineByIdWithCategories(machineId),
    getCategories(),
    getAllSubcategories(),
  ]);

  if (!machine) {
    notFound();
  }

  return (
    <MachineForm
      machine={machine}
      machineCategories={machine.categories}
      categories={categories}
      subcategories={subcategories}
    />
  );
}
