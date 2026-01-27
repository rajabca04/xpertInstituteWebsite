import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Xpert Institute</h1>
              <p className="text-xs text-gray-600">Empowering Education Since 2016</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection('partners')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Partners
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('certificates')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Certificates
            </button>
            <button
              onClick={() => scrollToSection('enroll')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Enroll Now
            </button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection('partners')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Partners
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('certificates')}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Certificates
            </button>
            <button
              onClick={() => scrollToSection('enroll')}
              className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Enroll Now
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
