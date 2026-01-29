import { GraduationCap, Menu, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <GraduationCap className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Xpert Institute</h1>
            <p className="text-xs text-gray-600">Empowering Education Since 2016</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-4">
            {["home", "courses", "partners", "testimonials", "certificates"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-semibold"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link
              to="/enroll-student"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Enroll Now
            </Link>

            <Link
              to="/admin-dashbord"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors font-medium"
            >
              <Lock className="w-4 h-4" />
              Admin
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <Menu className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3">
          {["home", "courses", "partners", "testimonials", "certificates"].map(
            (section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-semibold"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            )
          )}

          <Link
            to="/enroll-student"
            className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Enroll Now
          </Link>

          <Link
            to="/admin-dashbord"
            className="flex items-center justify-center w-full gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors font-medium"
          >
            <Lock className="w-4 h-4" />
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
