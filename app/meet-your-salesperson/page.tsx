import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Your Salesperson",
  description:
    "Connect with your Taylor Products territory salesperson. Our experienced team covers NJ, PA, NY, and DE with personalized service and equipment expertise.",
};

// Salesperson data - would come from database in production
const salespeople = [
  {
    id: 1,
    firstName: "Aaron",
    lastName: "Longenecker",
    slug: "aaron-longenecker",
    phone: "610-295-4819",
    email: "a.longenecker@taylorproducts.net",
    bookingLink: "https://app.hubspot.com/meetings/a-longenecker",
    territories: ["Central Pennsylvania", "Western Pennsylvania", "Delaware"],
    yearsWithCompany: 14,
    bio: "Aaron brings 14 years of foodservice equipment expertise to the team. He specializes in helping convenience stores and quick-service restaurants build profitable soft serve and frozen beverage programs.",
  },
  {
    id: 2,
    firstName: "Jason",
    lastName: "Rossi",
    slug: "jason-rossi",
    phone: "732-690-8823",
    email: "j.rossi@taylorproducts.net",
    bookingLink: "https://app.hubspot.com/meetings/j-rossi1/30",
    territories: [
      "Northeast New Jersey",
      "Long Island",
      "New York City",
      "Westchester County",
      "Rockland County",
    ],
    yearsWithCompany: 10,
    bio: "Jason has spent a decade helping operators in the NY metro area maximize their equipment investments. His deep knowledge of high-volume operations makes him the go-to resource for busy urban locations.",
  },
  {
    id: 3,
    firstName: "Thomas",
    lastName: "Mauser",
    slug: "thomas-mauser",
    phone: "610-761-5522",
    email: "t.mauser@taylorproducts.net",
    bookingLink: "https://app.hubspot.com/meetings/t-mauser",
    territories: ["Northeastern Pennsylvania", "Southern New Jersey"],
    bio: "Thomas combines technical expertise with a consultative approach, helping operators find the right equipment solutions for their unique needs and budgets.",
  },
  {
    id: 4,
    firstName: "Jonathan",
    lastName: "Mauser",
    slug: "jonathan-mauser",
    phone: "732-995-2605",
    email: "j.mauser@taylorproducts.net",
    bookingLink: null,
    territories: [
      "Northwest New Jersey",
      "Central New Jersey",
      "Richmond County NY",
    ],
    bio: "Jonathan brings fresh energy and dedication to the Taylor Products team, focusing on building long-term relationships with operators throughout Central and Northwest New Jersey.",
  },
];

export default function MeetYourSalespersonPage() {
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
              <h1 className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
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
              {salespeople.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-[var(--gray-200)] hover:shadow-xl transition-shadow"
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start gap-6 mb-6">
                      {/* Avatar Placeholder */}
                      <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-[var(--blue-500)] to-[var(--navy-700)] flex items-center justify-center">
                        <span className="text-white text-2xl font-bold font-[family-name:var(--font-outfit)]">
                          {person.firstName[0]}
                          {person.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl text-[var(--navy-800)]">
                          {person.firstName} {person.lastName}
                        </h2>
                        <p className="text-[var(--gray-600)]">
                          Territory Sales Representative
                        </p>
                        {person.yearsWithCompany && (
                          <p className="text-sm text-[var(--blue-500)] mt-1">
                            {person.yearsWithCompany} years with Taylor Products
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-[var(--gray-600)] mb-6 leading-relaxed">
                      {person.bio}
                    </p>

                    {/* Territories */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[var(--orange-500)]" />
                        <h3 className="font-[family-name:var(--font-outfit)] font-semibold text-sm text-[var(--gray-700)]">
                          Territories
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {person.territories.map((territory) => (
                          <span
                            key={territory}
                            className="inline-flex px-3 py-1 bg-[var(--blue-50)] text-[var(--blue-700)] text-xs font-medium rounded-full"
                          >
                            {territory}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-6">
                      <a
                        href={`tel:${person.phone}`}
                        className="flex items-center gap-3 text-[var(--gray-700)] hover:text-[var(--blue-500)] transition-colors"
                      >
                        <Phone className="w-5 h-5 text-[var(--blue-500)]" />
                        <span>{person.phone}</span>
                      </a>
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
              ))}
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
              <h2 className="font-[family-name:var(--font-outfit)] font-bold text-2xl md:text-3xl text-white mb-4">
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
