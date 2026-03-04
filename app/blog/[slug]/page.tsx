import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleSchema, BreadcrumbSchema } from "@/components/Schema";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/data";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { ContactSection } from "@/components/home/ContactSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Taylor Products",
    };
  }

  return {
    title: post.metaTitle || `${post.title} | Taylor Products Blog`,
    description: post.metaDescription || post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
    },
  };
}

function stripWpComments(html: string): string {
  return html.replace(/<!--\s*\/?wp:\w+[^>]*-->\n?/g, "");
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const cleanContent = stripWpComments(post.content);

  // Build breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Home", url: "https://taylorproducts.net" },
    { name: post.isWhatsNew ? "What's New" : "Blog", url: `https://taylorproducts.net/${post.isWhatsNew ? "new" : "blog"}` },
    { name: post.title, url: `https://taylorproducts.net/blog/${slug}` },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleSchema
        title={post.title}
        description={post.excerpt || post.title}
        url={`https://taylorproducts.net/blog/${slug}`}
        image={post.featuredImageUrl || undefined}
        datePublished={post.publishedAt?.toISOString()}
        dateModified={post.updatedAt?.toISOString()}
        author="Taylor Products"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      <main id="main-content" className="pt-[120px]">
        {/* Hero Section with Featured Image */}
        <section className="relative overflow-hidden">
          {post.featuredImageUrl ? (
            <>
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={post.featuredImageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-900)]/90 via-[var(--navy-800)]/85 to-[var(--navy-900)]/75" />
              </div>
              {/* Content */}
              <div className="relative py-16 md:py-24">
                <div className="container">
                  <div className="max-w-3xl">
                    <Link
                      href={post.isWhatsNew ? "/new" : "/blog"}
                      className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to {post.isWhatsNew ? "What's New" : "Blog"}
                    </Link>

                    <h1
                      className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                      style={{ color: "white" }}
                    >
                      {post.title}
                    </h1>

                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-white/80">
                        <CalendarDays className="w-4 h-4" />
                        <time dateTime={post.publishedAt.toISOString()}>
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Fallback: gradient hero without image */
            <div className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)] py-12 md:py-16">
              <div className="container">
                <div className="max-w-3xl">
                  <Link
                    href={post.isWhatsNew ? "/new" : "/blog"}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to {post.isWhatsNew ? "What's New" : "Blog"}
                  </Link>

                  <h1
                    className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                    style={{ color: "white" }}
                  >
                    {post.title}
                  </h1>

                  {post.publishedAt && (
                    <div className="flex items-center gap-2 text-white/80">
                      <CalendarDays className="w-4 h-4" />
                      <time dateTime={post.publishedAt.toISOString()}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Content */}
        <section className="section">
          <div className="container">
            <article className="max-w-3xl mx-auto">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-[family-name:var(--font-heading)]
                  prose-headings:text-[var(--navy-800)]
                  prose-p:text-[var(--gray-600)]
                  prose-a:text-[var(--blue-500)]
                  prose-strong:text-[var(--navy-800)]
                  prose-ul:text-[var(--gray-600)]
                  prose-ol:text-[var(--gray-600)]"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
              />
            </article>
          </div>
        </section>

        {/* Related CTA */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-2xl mb-4"
                style={{ color: "var(--navy-800)" }}
              >
                Questions About This Topic?
              </h2>
              <p className="text-[var(--gray-600)] mb-6">
                Our team is always happy to help. Reach out and let&apos;s talk.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:610-268-0500">
                  <button className="px-6 py-3 bg-[var(--blue-500)] text-white font-semibold rounded-lg hover:bg-[var(--blue-600)] transition-colors">
                    Call 610-268-0500
                  </button>
                </a>
                <Link href={post.isWhatsNew ? "/new" : "/blog"}>
                  <button className="px-6 py-3 bg-white text-[var(--navy-800)] font-semibold rounded-lg border border-[var(--gray-300)] hover:bg-[var(--gray-100)] transition-colors">
                    More {post.isWhatsNew ? "Updates" : "Articles"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
