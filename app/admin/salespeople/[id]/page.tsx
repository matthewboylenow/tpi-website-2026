import { notFound } from "next/navigation";
import { getSalespersonById, getCountiesBySalesperson } from "@/lib/data";
import { SalespersonForm } from "../SalespersonForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSalespersonPage({ params }: PageProps) {
  const { id } = await params;
  const salespersonId = parseInt(id, 10);

  if (isNaN(salespersonId)) {
    notFound();
  }

  const [salesperson, assignedCounties] = await Promise.all([
    getSalespersonById(salespersonId),
    getCountiesBySalesperson(salespersonId),
  ]);

  if (!salesperson) {
    notFound();
  }

  return (
    <SalespersonForm
      salesperson={salesperson}
      assignedCounties={assignedCounties}
    />
  );
}
