import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Mail, Phone, Calendar } from "lucide-react";
import { getAllSalespeople } from "@/lib/data";
import { DeleteSalespersonButton } from "./DeleteSalespersonButton";

export default async function SalespeopleAdminPage() {
  const salespeople = await getAllSalespeople();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
            Salespeople
          </h1>
          <p className="text-[var(--gray-600)] mt-1">
            Manage sales team members and their territories
          </p>
        </div>
        <Link href="/admin/salespeople/new">
          <Button variant="primary">
            <Plus className="w-5 h-5" />
            Add Salesperson
          </Button>
        </Link>
      </div>

      {/* Salespeople Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salespeople.map((person) => (
          <div
            key={person.id}
            className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden"
          >
            {/* Header with headshot */}
            <div className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--gray-100)] flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                  {person.headshotUrl ? (
                    <Image
                      src={person.headshotUrl}
                      alt={`${person.firstName} ${person.lastName}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-[var(--gray-500)]">
                      {person.firstName[0]}
                      {person.lastName[0]}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)]">
                    {person.firstName} {person.lastName}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    {person.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="px-6 py-3 border-t border-[var(--gray-100)] space-y-2">
              <div className="flex items-center gap-2 text-sm text-[var(--gray-600)]">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{person.email}</span>
              </div>
              {person.phone && (
                <div className="flex items-center gap-2 text-sm text-[var(--gray-600)]">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{person.phone}</span>
                </div>
              )}
              {person.bookingLink && (
                <div className="flex items-center gap-2 text-sm text-[var(--gray-600)]">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Has booking link</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-[var(--gray-200)] bg-[var(--gray-50)] flex items-center justify-between">
              <span className="text-sm text-[var(--gray-500)]">
                Order: {person.displayOrder ?? 0}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/salespeople/${person.slug}`}
                  target="_blank"
                  className="p-2 text-[var(--gray-500)] hover:text-[var(--blue-500)] hover:bg-white rounded-lg transition-colors"
                  title="View on site"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/admin/salespeople/${person.id}`}
                  className="p-2 text-[var(--gray-500)] hover:text-[var(--blue-500)] hover:bg-white rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <DeleteSalespersonButton
                  id={person.id}
                  name={`${person.firstName} ${person.lastName}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {salespeople.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-[var(--gray-200)]">
          <p className="text-[var(--gray-500)]">No salespeople found</p>
          <Link href="/admin/salespeople/new" className="inline-block mt-4">
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Add Your First Salesperson
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
