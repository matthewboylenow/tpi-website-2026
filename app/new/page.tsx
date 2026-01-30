import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getWhatsNewPosts } from "@/lib/data";
import { CalendarDays, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "What's New | Taylor Products",
  description:
    "The latest news, promotions, and announcements from Taylor Products. Stay up to date with new equipment, special offers, and company updates.",
};

export default async function WhatsNewPage() {
  const posts = await getWhatsNewPosts();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)] py-16">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-[var(--orange-400)] font-[family-name:var(--font-heading)] font-semibold text-sm uppercase tracking-wider mb-4">
                Latest Updates
              </p>
              <h1
                className="font-[family-name:var(--font-heading)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: "white" }}
              >
                What&apos;s New at Taylor Products
              </h1>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                New equipment, special promotions, and company news. Here&apos;s
                what&apos;s happening.
              </p>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="section">
          <div className="container">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[var(--gray-100)] flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-[var(--gray-400)]" />
                </div>
                <h2
                  className="font-[family-name:var(--font-heading)] font-semibold text-xl mb-2"
                  style={{ color: "var(--navy-800)" }}
                >
                  Nothing New... Yet!
                </h2>
                <p className="text-[var(--gray-500)] text-lg mb-6">
                  We&apos;re always working on something. Check back soon for
                  updates, or give us a call to see what we&apos;re up to.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/blog"
                    className="text-[var(--blue-500)] hover:underline"
                  >
                    Read Our Blog →
                  </Link>
                  <span className="text-[var(--gray-300)]">|</span>
                  <a
                    href="tel:610-268-0500"
                    className="text-[var(--blue-500)] hover:underline"
                  >
                    Call Us: 610-268-0500
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <article
                    key={post.id}
                    className={`bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden hover:shadow-lg transition-shadow ${
                      index === 0 ? "lg:flex" : ""
                    }`}
                  >
                    {post.featuredImageUrl && (
                      <div
                        className={`bg-[var(--gray-100)] overflow-hidden ${
                          index === 0
                            ? "lg:w-1/2 aspect-video lg:aspect-auto"
                            : "aspect-video"
                        }`}
                      >
                        <img
                          src={post.featuredImageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div
                      className={`p-6 md:p-8 ${
                        index === 0 && post.featuredImageUrl
                          ? "lg:w-1/2 lg:flex lg:flex-col lg:justify-center"
                          : ""
                      }`}
                    >
                      {post.publishedAt && (
                        <div className="flex items-center gap-2 text-sm text-[var(--gray-500)] mb-3">
                          <CalendarDays className="w-4 h-4" />
                          <time dateTime={post.publishedAt.toISOString()}>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        </div>
                      )}
                      <h2
                        className={`font-[family-name:var(--font-heading)] font-bold text-[var(--navy-800)] mb-3 ${
                          index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                        }`}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-[var(--blue-500)] transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt && (
                        <p
                          className={`text-[var(--gray-600)] mb-4 ${
                            index === 0 ? "text-base" : "text-sm line-clamp-2"
                          }`}
                        >
                          {post.excerpt}
                        </p>
                      )}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-[var(--blue-500)] font-medium text-sm hover:gap-3 transition-all"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter / Contact CTA */}
        <section className="section bg-gradient-to-r from-[var(--blue-600)] to-[var(--navy-700)]">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="font-[family-name:var(--font-heading)] font-bold text-2xl md:text-3xl mb-4"
                style={{ color: "white" }}
              >
                Don&apos;t Miss Out
              </h2>
              <p className="text-blue-100 mb-8">
                Want to hear about special deals and new equipment first? Give
                us a call or stop by the showroom. We&apos;d love to keep you in
                the loop.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:610-268-0500">
                  <button className="px-6 py-3 bg-white text-[var(--blue-600)] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    Call 610-268-0500
                  </button>
                </a>
                <Link href="/meet-your-salesperson">
                  <button className="px-6 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-colors">
                    Meet Your Salesperson
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
