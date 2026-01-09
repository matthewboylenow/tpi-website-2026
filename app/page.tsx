import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Hero,
  ValueProposition,
  ProductsGrid,
  Testimonials,
  ContactSection,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        <Hero />
        <ValueProposition />
        <ProductsGrid />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
