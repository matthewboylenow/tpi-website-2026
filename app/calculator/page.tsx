import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calculator } from "./Calculator";

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[120px]">
        <Calculator />
      </main>
      <Footer />
    </>
  );
}
