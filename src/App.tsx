import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Partners from "./components/Partners";
import Testimonials from "./components/Testimonials";
import Certificates from "./components/Certificates";
import EnrollmentForm from "./components/EnrollmentForm";
import Footer from "./components/Footer";
import OfferPopup from "./components/OfferPopup";
import { supabase } from "./lib/supabase";

function App() {
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    document.title = "Xpert Institute - Quality Education & Authorized Degrees";
  }, []);

  // ✅ Show popup on page load (once per session)
  useEffect(() => {
    const hasSeenOffer = sessionStorage.getItem("offer_seen");

    if (!hasSeenOffer) {
      setShowOffer(true);
      sessionStorage.setItem("offer_seen", "true");
    }
  }, []);

  // Supabase test
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from("student_enrollments")
        .select("*")
        .limit(1);

      if (error) {
        console.error("❌ Supabase error:", error.message);
      } else {
        console.log("✅ Supabase connected!", data);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {showOffer && <OfferPopup onClose={() => setShowOffer(false)} />}
      <Header />
      <Hero />
      <Courses />
      <Partners />
      <Testimonials />
      <Certificates />
      <EnrollmentForm />
      <Footer />
    </div>
  );
}

export default App;
