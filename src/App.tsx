import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Partners from "./components/Partners";
import Testimonials from "./components/Testimonials";
import Certificates from "./components/Certificates";
import Footer from "./components/Footer";
import OfferPopup from "./components/OfferPopup";
import { supabase } from "./lib/supabase";
import ChatBotWidget from "./components/ChatBotWidget";

function App() {
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    document.title = "Xpert Institute - Quality Education & Authorized Degrees";
  }, []);

  useEffect(() => {
    setShowOffer(true);
  }, []);

  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from("student_enrollments")
        .select("*")
        .limit(1);

      if (error) console.error("❌ Supabase error:", error.message);
      else console.log("✅ Supabase connected!", data);
    };
    testConnection();
  }, []);

  return (
     <div className="min-h-screen bg-white">
      {showOffer && <OfferPopup onClose={() => setShowOffer(false)} />}
      <Header />
      <Hero />
      <Certificates />
      <Courses />
      <Partners />
      <Testimonials />
      {/* Chatbot Floating Widget */}
      <ChatBotWidget />
      <Footer />
    </div>
  );
}

export default App;
