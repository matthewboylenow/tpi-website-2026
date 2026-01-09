"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, Loader2, Package, FileText, Tag } from "lucide-react";

interface SearchResult {
  type: "machine" | "category" | "blog";
  title: string;
  description?: string;
  href: string;
  modelNumber?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search on initial load if query param exists
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    router.push(`/search?q=${encodeURIComponent(query)}`);
    performSearch(query);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "machine":
        return <Package className="w-5 h-5" />;
      case "category":
        return <Tag className="w-5 h-5" />;
      case "blog":
        return <FileText className="w-5 h-5" />;
      default:
        return <Search className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "machine":
        return "Equipment";
      case "category":
        return "Category";
      case "blog":
        return "Article";
      default:
        return type;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)] py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl leading-tight mb-6"
              style={{ color: "white" }}
            >
              Search
            </h1>
            <p
              className="text-lg mb-8"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              Find equipment, articles, and more
            </p>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for machines, parts, articles..."
                  className="w-full px-6 py-4 pr-14 rounded-xl text-lg bg-white text-[var(--navy-800)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-4 focus:ring-[var(--orange-500)]/30"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[var(--blue-500)] text-white rounded-lg hover:bg-[var(--blue-600)] transition-colors"
                  aria-label="Search"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--blue-500)] mx-auto mb-4" />
                <p className="text-[var(--gray-500)]">Searching...</p>
              </div>
            ) : hasSearched ? (
              results.length > 0 ? (
                <div>
                  <p className="text-[var(--gray-500)] mb-6">
                    {results.length} result{results.length !== 1 ? "s" : ""} for
                    &quot;{initialQuery}&quot;
                  </p>
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <Link
                        key={`${result.type}-${index}`}
                        href={result.href}
                        className="block p-6 bg-white rounded-xl border border-[var(--gray-200)] hover:border-[var(--blue-300)] hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--gray-100)] group-hover:bg-[var(--blue-50)] flex items-center justify-center text-[var(--gray-500)] group-hover:text-[var(--blue-500)] transition-colors">
                            {getIcon(result.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-[var(--blue-500)] uppercase tracking-wider">
                                {getTypeLabel(result.type)}
                              </span>
                              {result.modelNumber && (
                                <span className="text-xs text-[var(--gray-400)]">
                                  • {result.modelNumber}
                                </span>
                              )}
                            </div>
                            <h2 className="font-[family-name:var(--font-outfit)] font-semibold text-lg text-[var(--navy-800)] group-hover:text-[var(--blue-500)] transition-colors">
                              {result.title}
                            </h2>
                            {result.description && (
                              <p className="text-[var(--gray-600)] text-sm mt-1 line-clamp-2">
                                {result.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[var(--gray-100)] flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-[var(--gray-400)]" />
                  </div>
                  <h2
                    className="font-[family-name:var(--font-outfit)] font-semibold text-xl mb-2"
                    style={{ color: "var(--navy-800)" }}
                  >
                    No Results Found
                  </h2>
                  <p className="text-[var(--gray-500)] mb-6">
                    We couldn&apos;t find anything matching &quot;{initialQuery}
                    &quot;. Try a different search term.
                  </p>
                  <SuggestionButtons
                    setQuery={setQuery}
                    performSearch={performSearch}
                  />
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[var(--gray-100)] flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-[var(--gray-400)]" />
                </div>
                <h2
                  className="font-[family-name:var(--font-outfit)] font-semibold text-xl mb-2"
                  style={{ color: "var(--navy-800)" }}
                >
                  What Are You Looking For?
                </h2>
                <p className="text-[var(--gray-500)] mb-6">
                  Search our equipment catalog, blog articles, and more.
                </p>
                <SuggestionButtons
                  setQuery={setQuery}
                  performSearch={performSearch}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="section bg-[var(--gray-50)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="font-[family-name:var(--font-outfit)] font-bold text-2xl mb-4"
              style={{ color: "var(--navy-800)" }}
            >
              Can&apos;t Find What You Need?
            </h2>
            <p className="text-[var(--gray-600)] mb-6">
              Our team is happy to help. Give us a call and we&apos;ll point you
              in the right direction.
            </p>
            <a
              href="tel:610-268-0500"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--blue-500)] text-white font-semibold rounded-lg hover:bg-[var(--blue-600)] transition-colors"
            >
              Call 610-268-0500
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SuggestionButtons({
  setQuery,
  performSearch,
}: {
  setQuery: (q: string) => void;
  performSearch: (q: string) => void;
}) {
  const router = useRouter();

  const suggestions = [
    { label: "soft serve", query: "soft serve" },
    { label: "frozen yogurt", query: "frozen yogurt" },
    { label: "grill", query: "grill" },
    { label: "slush", query: "slush" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {suggestions.map((s) => (
        <button
          key={s.query}
          onClick={() => {
            setQuery(s.query);
            router.push(`/search?q=${encodeURIComponent(s.query)}`);
            performSearch(s.query);
          }}
          className="px-4 py-2 text-sm bg-[var(--gray-100)] text-[var(--gray-600)] rounded-lg hover:bg-[var(--gray-200)] transition-colors"
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

function SearchLoading() {
  return (
    <>
      <section className="bg-gradient-to-br from-[var(--navy-900)] via-[var(--navy-800)] to-[var(--blue-800)] py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="font-[family-name:var(--font-outfit)] font-extrabold text-3xl sm:text-4xl leading-tight mb-6"
              style={{ color: "white" }}
            >
              Search
            </h1>
            <p
              className="text-lg mb-8"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              Find equipment, articles, and more
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="h-14 bg-white/20 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--blue-500)] mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        <Suspense fallback={<SearchLoading />}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
