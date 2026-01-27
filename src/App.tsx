import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Partners from './components/Partners';
import Testimonials from './components/Testimonials';
import Certificates from './components/Certificates';
import EnrollmentForm from './components/EnrollmentForm';
import Footer from './components/Footer';
import { supabase } from './lib/supabase';

function App() {
  useEffect(() => {
    document.title = 'Xpert Institute - Quality Education & Authorized Degrees';
  }, []);

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
