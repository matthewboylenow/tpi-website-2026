import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPublishedBlogPosts } from "@/lib/data";
import { CalendarDays, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Taylor Products",
  description:
    "Tips, insights, and industry news from Taylor Products. Learn how to get the most out of your frozen dessert equipment.",
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)] py-16">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-[var(--orange-400)] font-[family-name:var(--font-outfit)] font-semibold text-sm uppercase tracking-wider mb-4">
                Our Blog
              </p>
              <h1
                className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: "white" }}
              >
                Tips, Stories & Industry Insights
              </h1>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                Helpful advice from 40 years in the business. Whether you&apos;re
                just starting out or looking to grow, we&apos;ve got something
                for you.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section">
          <div className="container">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[var(--gray-500)] text-lg mb-4">
                  No blog posts yet. Check back soon!
                </p>
                <Link
                  href="/new"
                  className="text-[var(--blue-500)] hover:underline"
                >
                  See What&apos;s New at Taylor Products →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    {post.featuredImageUrl && (
                      <div className="aspect-video bg-[var(--gray-100)] overflow-hidden">
                        <img
                          src={post.featuredImageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
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
                      <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-xl text-[var(--navy-800)] mb-3 group-hover:text-[var(--blue-500)] transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      {post.excerpt && (
                        <p className="text-[var(--gray-600)] text-sm mb-4 line-clamp-3">
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

        {/* CTA Section */}
        <section className="section bg-[var(--gray-50)]">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="font-[family-name:var(--font-outfit)] font-bold text-2xl mb-4"
                style={{ color: "var(--navy-800)" }}
              >
                Have a Question?
              </h2>
              <p className="text-[var(--gray-600)] mb-6">
                Our team is always happy to help. Whether it&apos;s equipment
                advice, service questions, or just saying hello—we&apos;d love
                to hear from you.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--blue-500)] text-white font-semibold rounded-lg hover:bg-[var(--blue-600)] transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
