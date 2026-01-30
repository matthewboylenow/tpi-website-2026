import { getAllContactSubmissions } from "@/lib/data";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { DeleteContactButton } from "./DeleteContactButton";

export default async function ContactsAdminPage() {
  const contacts = await getAllContactSubmissions();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-[var(--navy-800)]">
          Contact Submissions
        </h1>
        <p className="text-[var(--gray-600)] mt-1">
          {contacts.length} submission{contacts.length !== 1 ? "s" : ""} received
        </p>
      </div>

      {/* Contacts List */}
      {contacts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-[var(--gray-200)] text-center">
          <Mail className="w-12 h-12 text-[var(--gray-300)] mx-auto mb-4" />
          <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)] mb-2">
            No Submissions Yet
          </h2>
          <p className="text-[var(--gray-500)]">
            When visitors submit the contact form, their messages will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-200)] overflow-hidden">
          <div className="divide-y divide-[var(--gray-200)]">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-6 hover:bg-[var(--gray-50)] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-[var(--navy-800)]">
                        {contact.name || "Anonymous"}
                      </h3>
                      <span className="text-xs text-[var(--gray-400)] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {contact.createdAt
                          ? new Date(contact.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })
                          : "Unknown date"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-[var(--gray-600)] mb-3">
                      {contact.email && (
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex items-center gap-1 hover:text-[var(--blue-500)]"
                        >
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </a>
                      )}
                      {contact.phone && (
                        <a
                          href={`tel:${contact.phone}`}
                          className="flex items-center gap-1 hover:text-[var(--blue-500)]"
                        >
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </a>
                      )}
                      {contact.county && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {contact.county}
                        </span>
                      )}
                    </div>

                    {contact.message && (
                      <p className="text-[var(--gray-700)] bg-[var(--gray-50)] rounded-lg p-4 text-sm">
                        {contact.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <DeleteContactButton id={contact.id} name={contact.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
