import { GraduationCap, Menu, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Sample-certifucate/Icon-xpertInstitute.jpeg";

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
          <img
            src={logo}
            alt="Xpert Institute"
            className="w-14 h-14 object-contain rounded-full shadow-sm"
          />
          <div className="flex flex-col leading-tight">
            <h1 className="text-2xl font-bold text-gray-900">Xpert Institute</h1>
            <p className="text-xs text-gray-500">Empowering Education Since 2016</p>
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
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
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
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium"
            >
              Enroll Now
            </Link>

            <Link
              to="/admin-dashbord"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-all font-medium"
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
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow-md">
          {["home", "courses", "partners", "testimonials", "certificates"].map(
            (section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            )
          )}

          <Link
            to="/enroll-student"
            className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium"
          >
            Enroll Now
          </Link>

          <Link
            to="/admin-dashbord"
            className="flex items-center justify-center w-full gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-all font-medium"
          >
            <Lock className="w-4 h-4" />
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
