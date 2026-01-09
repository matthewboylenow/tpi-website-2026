import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Hero,
  ValueProposition,
  ProductsGrid,
  Testimonials,
  ContactSection,
} from "@/components/home";
import { getCategories, getFeaturedTestimonials } from "@/lib/data";

export default async function Home() {
  const [categories, testimonials] = await Promise.all([
    getCategories(),
    getFeaturedTestimonials(),
  ]);

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        <Hero />
        <ValueProposition />
        <ProductsGrid categories={categories} />
        <Testimonials testimonials={testimonials} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
