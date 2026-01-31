import {
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";

export default function Footer() {
  type PolicyType = "privacy" | "terms" | "refund" | null;

  const [openPolicy, setOpenPolicy] = useState<PolicyType>(null);

  const policyContent = {
    privacy: {
      title: "Privacy Policy",
      content: `
At Xpert Institute, we respect your privacy and are committed to protecting your personal information.
We collect basic details such as name, phone number, email address, and course preferences only for
admission, communication, and academic purposes.

Your data is never sold, shared, or misused with third parties. All uploaded documents, images, and
certificates are securely stored and accessed only by authorized administrators. We implement industry-
standard security practices to protect your information from unauthorized access.

By using our platform, you agree to the collection and use of information as outlined in this policy.
We may update this policy from time to time, and any changes will be reflected on this page.
      `,
    },
    terms: {
      title: "Terms of Service",
      content: `
By accessing Xpert Institute services, you agree to follow our terms and conditions.
All course materials, content, and resources provided are for educational purposes only and
may not be redistributed without permission.

Students must provide accurate information during enrollment. Any misuse of the platform,
including false data submission or unauthorized access, may lead to account suspension.

Xpert Institute reserves the right to modify courses, fees, schedules, or policies at any time.
Continued use of our services indicates acceptance of these terms.
      `,
    },
    refund: {
      title: "Refund Policy",
      content: `
Xpert Institute follows a transparent and fair refund policy.
Refund requests must be submitted within the specified period after enrollment.

Refunds are processed only if the student has not accessed a significant portion of the course
or violated institute policies. Administrative and registration fees may be non-refundable.

Approved refunds will be processed within 7–10 working days via the original payment method.
The institute reserves the right to deny refunds in cases of misuse or policy violation.
      `,
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer  className="relative bg-gray-900 text-white pt-20 pb-8 overflow-hidden">
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
              Providing quality education through authorized university programs
              since 2010. Your success is our mission.
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
                ["Home", "home"],
                ["Courses", "courses"],
                ["University Partners", "partners"],
                ["Testimonials", "testimonials"],
                ["Enroll Now", "enroll"],
              ].map(([label, id]) => (
                <li key={id}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth" })
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

            <ul className="space-y-4" id="contact-us">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-gray-400">
                  Near Bank of India, Banmankhi, Bihar 854202
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a
                  href="tel:+919065135324"
                  className="text-gray-400 hover:text-blue-400"
                >
                  9065135324
                </a>
                <a
                  href="tel:+917717784838"
                  className="text-gray-400 hover:text-blue-400"
                >
                  7717784838
                </a>
                <a
                  href="tel:+9179797712231"
                  className="text-gray-400 hover:text-blue-400"
                >
                  79797712231
                </a>
              </li>

              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a
                  href="mailto:xpertinstitute.help@gmail.com"
                  className="text-gray-400 hover:text-blue-400"
                >
                  xpertinstitute.help@gmail.com
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

            <p className="text-gray-500 text-sm">
              - : Design & Developed by Xpert Software Solutions : -
            </p>

            <>
              {/* Footer Links */}
              <div className="flex space-x-6 text-sm">
                <button
                  onClick={() => setOpenPolicy("privacy")}
                  className="text-gray-500 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setOpenPolicy("terms")}
                  className="text-gray-500 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => setOpenPolicy("refund")}
                  className="text-gray-500 hover:text-blue-400 transition-colors"
                >
                  Refund Policy
                </button>
              </div>

              {/* Popup Modal */}
              {openPolicy && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white max-w-lg w-full rounded-xl shadow-lg p-6 relative">
                    <button
                      onClick={() => setOpenPolicy(null)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>

                    <h2 className="text-xl font-semibold mb-4 text-blue-600">
                      {policyContent[openPolicy].title}
                    </h2>

                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {policyContent[openPolicy].content}
                    </p>

                    <div className="mt-6 text-right">
                      <button
                        onClick={() => setOpenPolicy(null)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </footer>
  );
}
