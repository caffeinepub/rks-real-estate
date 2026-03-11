import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef } from "react";
import AboutSection from "./components/AboutSection";
import EnquirySection from "./components/EnquirySection";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PropertiesSection from "./components/PropertiesSection";
import { useGetAllProperties, useSeedProperties } from "./hooks/useQueries";

function App() {
  const { data: properties, isLoading } = useGetAllProperties();
  const { mutate: seedProperties } = useSeedProperties();
  const seeded = useRef(false);

  useEffect(() => {
    if (
      !isLoading &&
      properties !== undefined &&
      properties.length === 0 &&
      !seeded.current
    ) {
      seeded.current = true;
      seedProperties();
    }
  }, [properties, isLoading, seedProperties]);

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <main>
        <HeroSection />
        <PropertiesSection />
        <EnquirySection />
        <AboutSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
