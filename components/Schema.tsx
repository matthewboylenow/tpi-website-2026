// JSON-LD Schema Components for SEO

interface OrganizationSchemaProps {
  url?: string;
}

export function OrganizationSchema({ url = "https://taylorproducts.net" }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Taylor Products Inc.",
    alternateName: "Taylor Products",
    url: url,
    logo: "https://taylorproducts.net/wp-content/uploads/2022/04/Artboard-2@2x-300x83.png",
    description: "Family-owned foodservice equipment distributor since 1985. Authorized Taylor Company dealer serving NJ, PA, NY & DE with soft serve machines, grills, and frozen beverage equipment.",
    foundingDate: "1985",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "264 Welsh Pool Rd",
        addressLocality: "Exton",
        addressRegion: "PA",
        postalCode: "19341",
        addressCountry: "US"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "255 Raritan Center Pkwy",
        addressLocality: "Edison",
        addressRegion: "NJ",
        postalCode: "08837",
        addressCountry: "US"
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-610-268-0500",
      contactType: "sales",
      email: "info@taylorproducts.net",
      areaServed: ["NJ", "PA", "NY", "DE"],
      availableLanguage: "English"
    },
    sameAs: [
      "https://www.facebook.com/TaylorProductsInc",
      "https://www.instagram.com/taylorproductsinc",
      "https://www.linkedin.com/company/taylor-products-inc",
      "https://twitter.com/taylorprodinc"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalBusinessSchemaProps {
  location: "exton" | "edison";
}

export function LocalBusinessSchema({ location }: LocalBusinessSchemaProps) {
  const locations = {
    exton: {
      name: "Taylor Products Inc. - Pennsylvania Showroom",
      streetAddress: "264 Welsh Pool Rd",
      addressLocality: "Exton",
      addressRegion: "PA",
      postalCode: "19341",
    },
    edison: {
      name: "Taylor Products Inc. - New Jersey Showroom",
      streetAddress: "255 Raritan Center Pkwy",
      addressLocality: "Edison",
      addressRegion: "NJ",
      postalCode: "08837",
    }
  };

  const loc = locations[location];

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://taylorproducts.net/#${location}`,
    name: loc.name,
    image: "https://taylorproducts.net/wp-content/uploads/2022/04/Artboard-2@2x-300x83.png",
    telephone: "+1-610-268-0500",
    email: "info@taylorproducts.net",
    url: "https://taylorproducts.net",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.streetAddress,
      addressLocality: loc.addressLocality,
      addressRegion: loc.addressRegion,
      postalCode: loc.postalCode,
      addressCountry: "US"
    },
    priceRange: "$$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  model: string;
  description: string;
  image?: string;
  url: string;
  category?: string;
  sku?: string;
  brand?: string;
}

export function ProductSchema({
  name,
  model,
  description,
  image,
  url,
  category,
  sku,
  brand = "Taylor"
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${model} - ${name}`,
    description: description,
    sku: sku || model,
    mpn: model,
    brand: {
      "@type": "Brand",
      name: brand
    },
    manufacturer: {
      "@type": "Organization",
      name: "Taylor Company"
    },
    ...(image && { image: image }),
    url: url,
    ...(category && { category: category }),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      price: "0",
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      seller: {
        "@type": "Organization",
        name: "Taylor Products Inc."
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = "Taylor Products"
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    ...(image && { image: image }),
    ...(datePublished && { datePublished: datePublished }),
    ...(dateModified && { dateModified: dateModified }),
    author: {
      "@type": "Organization",
      name: author
    },
    publisher: {
      "@type": "Organization",
      name: "Taylor Products Inc.",
      logo: {
        "@type": "ImageObject",
        url: "https://taylorproducts.net/wp-content/uploads/2022/04/Artboard-2@2x-300x83.png"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
}

export function WebPageSchema({ title, description, url }: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    isPartOf: {
      "@type": "WebSite",
      name: "Taylor Products",
      url: "https://taylorproducts.net"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  questions: { question: string; answer: string }[];
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(q => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
