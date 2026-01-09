import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, MapPin } from "lucide-react";
import { getActiveSalespeople, getCountiesBySalesperson } from "@/lib/data";
import { getSalespersonImage } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Meet Your Salesperson",
  description:
    "Connect with your Taylor Products territory salesperson. Our experienced team covers NJ, PA, NY, and DE with personalized service and equipment expertise.",
};

// Helper type for salesperson with territories
type SalespersonWithTerritories = Awaited<ReturnType<typeof getActiveSalespeople>>[0] & {
  territories: string[];
};

export default async function MeetYourSalespersonPage() {
  const salespeople = await getActiveSalespeople();

  // Fetch territories for each salesperson
  const salespeopleWithTerritories: SalespersonWithTerritories[] = await Promise.all(
    salespeople.map(async (person) => {
      const counties = await getCountiesBySalesperson(person.id);
      // Group counties by state and format as "County, ST"
      const territories = counties.map((c) => `${c.name}, ${c.state}`);
      return {
        ...person,
        territories,
      };
    })
  );

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)] py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-[var(--orange-400)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4">
                Your Partners in Success
              </p>
              <h1
                className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: 'white' }}
              >
                Good Things Start Here
              </h1>
              <div className="w-20 h-1 bg-[var(--orange-500)] rounded-full mb-6" />
              <p className="text-lg text-gray-300 leading-relaxed">
                Our team of dedicated sales professionals is ready to help you
                find the perfect equipment, build profitable programs, and
                provide ongoing support for your business.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {salespeopleWithTerritories.map((person) => {
                const headshotUrl =
                  person.headshotUrl || getSalespersonImage(person.slug);
                const territories = person.territories;

                return (
                  <div
                    key={person.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-[var(--gray-200)] hover:shadow-xl transition-shadow"
                  >
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start gap-6 mb-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-[var(--blue-500)] to-[var(--navy-700)]">
                          {headshotUrl ? (
                            <Image
                              src={headshotUrl}
                              alt={`${person.firstName} ${person.lastName}`}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-white text-2xl font-bold font-[family-name:var(--font-outfit)]">
                                {person.firstName[0]}
                                {person.lastName[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
                            {person.firstName} {person.lastName}
                          </h2>
                          <p className="text-[var(--gray-600)]">
                            Territory Sales Representative
                          </p>
                        </div>
                      </div>

                      {/* Bio */}
                      {person.bio && (
                        <p className="text-[var(--gray-600)] mb-6 leading-relaxed">
                          {person.bio}
                        </p>
                      )}

                      {/* Territories */}
                      {territories.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-[var(--orange-500)]" />
                            <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-sm text-[var(--gray-700)]">
                              Territories
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {territories.map((territory) => (
                              <span
                                key={territory}
                                className="inline-flex px-3 py-1 bg-[var(--blue-50)] text-[var(--blue-700)] text-xs font-medium rounded-full"
                              >
                                {territory}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="space-y-3 mb-6">
                        {person.phone && (
                          <a
                            href={`tel:${person.phone}`}
                            className="flex items-center gap-3 text-[var(--gray-700)] hover:text-[var(--blue-500)] transition-colors"
                          >
                            <Phone className="w-5 h-5 text-[var(--blue-500)]" />
                            <span>{person.phone}</span>
                          </a>
                        )}
                        <a
                          href={`mailto:${person.email}`}
                          className="flex items-center gap-3 text-[var(--gray-700)] hover:text-[var(--blue-500)] transition-colors"
                        >
                          <Mail className="w-5 h-5 text-[var(--blue-500)]" />
                          <span>{person.email}</span>
                        </a>
                      </div>

                      {/* CTA */}
                      {person.bookingLink ? (
                        <a
                          href={person.bookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="primary" className="w-full">
                            <Calendar className="w-5 h-5" />
                            Book A Meeting
                          </Button>
                        </a>
                      ) : (
                        <a href={`mailto:${person.email}`}>
                          <Button variant="secondary" className="w-full">
                            <Mail className="w-5 h-5" />
                            Send Email
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Territory Map Placeholder */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-3xl text-[var(--navy-800)] mb-4">
                Our Service Territory
              </h2>
              <p className="text-[var(--gray-600)]">
                Taylor Products proudly serves businesses across New Jersey,
                Pennsylvania, New York, and Delaware with sales, service, and
                parts support.
              </p>
            </div>

            {/* Map Placeholder */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-[var(--gray-200)]">
              <div className="aspect-video bg-[var(--gray-100)] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-[var(--gray-400)] mx-auto mb-4" />
                  <p className="text-[var(--gray-500)]">
                    Territory Map Coming Soon
                  </p>
                  <p className="text-sm text-[var(--gray-400)] mt-2">
                    NJ • PA • NY • DE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Not Sure CTA */}
        <section className="section">
          <div className="container">
            <div className="bg-gradient-to-r from-[var(--blue-600)] to-[var(--navy-700)] rounded-2xl p-8 md:p-12 text-center">
              <h2
                className="font-[family-name:var(--font-outfit)] font-bold text-2xl md:text-3xl mb-4"
                style={{ color: 'white' }}
              >
                Not Sure Which Territory You&apos;re In?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                No problem! Give us a call and we&apos;ll connect you with the
                right salesperson for your area.
              </p>
              <a href="tel:610-268-0500">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-[var(--blue-600)] hover:bg-gray-100"
                >
                  <Phone className="w-5 h-5" />
                  Call 610-268-0500
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
