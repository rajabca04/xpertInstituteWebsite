import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-white pt-20 pb-8 overflow-hidden">
      {/* ✅ WATERMARK */}
     <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
  <h1 className="whitespace-nowrap rotate-[-8deg] text-[70px] md:text-[110px] font-extrabold text-white/5 tracking-widest select-none">
    XPERT INSTITUTE
  </h1>
</div>


      <div className="relative container mx-auto px-4">
        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <GraduationCap className="w-10 h-10 text-blue-400" />
              <div>
                <h3 className="text-2xl font-bold">Xpert Institute</h3>
                <p className="text-sm text-gray-400">Empowering Education</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">
              Providing quality education through authorized university programs since 2010.
              Your success is our mission.
            </p>

            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                ['Home', 'home'],
                ['Courses', 'courses'],
                ['University Partners', 'partners'],
                ['Testimonials', 'testimonials'],
                ['Enroll Now', 'enroll'],
              ].map(([label, id]) => (
                <li key={id}>
                  <button
                    onClick={() =>
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ COURSES (EXPANDED & BEAUTIFUL) */}
          <div>
            <h4 className="text-lg font-bold mb-5 border-b border-gray-700 pb-2">
              Our Courses
            </h4>

            <ul className="grid grid-cols-2 gap-y-3 text-gray-400 text-sm">
              <li>B.A / M.A</li>
              <li>B.Sc / M.Sc</li>
              <li>B.Com / M.Com</li>
              <li>BCA / MCA</li>
              <li>MBA</li>
              <li>B.Ed / M.Ed</li>
              <li>D.El.Ed</li>
              <li>B.Pharm</li>
              <li>D.Pharm</li>
              <li>PGDCA</li>
              <li>BLIS</li>
              <li>MLIS</li>
              <li>Music</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-5 border-b border-gray-700 pb-2">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-gray-400">
                  Near Bank of India, Jankinagar, Banmankhi, Bihar 854202
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a
                  href="tel:+919065135324"
                  className="text-gray-400 hover:text-blue-400"
                >
                  +91 9065135324
                </a>
              </li>

              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a
                  href="mailto:xpertinsitute.help@gmail.com"
                  className="text-gray-400 hover:text-blue-400"
                >
                  xpertinsitute.help@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Xpert Institute. All rights reserved.
            </p>

            <div className="flex space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
