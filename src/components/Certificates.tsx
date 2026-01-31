import { useState } from "react";
import { Award, CheckCircle, Shield } from "lucide-react";

// Import images
import Manglayatan from "../Sample-certifucate/MCA-Mangalayatan.jpeg";
import SwamiVivekanand from "../Sample-certifucate/MCA-Swami-Vivekanand.jpeg";
import RadhaGovind from "../Sample-certifucate/MSC-Radha-Govind.jpeg";
import Asian from "../Sample-certifucate/PGDCA-Asian.jpeg";
import MolanaMajhulhak from "../Sample-certifucate/BLis-Molana-majhulhak.jpeg";
import license from "../Sample-certifucate/Licence-Mangalayatan.jpeg"
const certificates = [
  {
    title: "MCA Degree Certificate",
    university: "Mangalayatan University",
    color: "from-blue-500 to-blue-700",
    images: [Manglayatan],
  },
  {
    title: "MCA Degree Certificate",
    university: "Swami Vivekanand University",
    color: "from-indigo-500 to-indigo-700",
    images: [SwamiVivekanand],
  },
  {
    title: "MSC Degree Certificate",
    university: "Radha Govind University",
    color: "from-purple-500 to-purple-700",
    images: [RadhaGovind],
  },
  {
    title: "PGDCA Certificate",
    university: "Asian University",
    color: "from-green-500 to-green-700",
    images: [Asian],
  },
  {
    title: "BLIS Degree Certificate",
    university: "Maulana Mazharul Haque University",
    color: "from-red-500 to-red-700",
    images: [MolanaMajhulhak],
  },
];

export default function Certificates() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="certificates"
      className="py-20 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sample Certificates
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            View authentic degree certificates from our partner universities
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {certificates.map((cert, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl"
              >
                {/* Header */}
                <div
                  className={`bg-gradient-to-r ${cert.color} p-8 text-white relative`}
                >
                  <div className="absolute top-4 right-4 opacity-20">
                    <Award className="w-24 h-24" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="w-6 h-6" />

                      <span className="text-sm font-semibold">
                        AUTHENTIC CERTIFICATE
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>

                    <p className="text-blue-100">{cert.university}</p>
                  </div>
                </div>

                {/* Accordion Image */}
                <div
                  onClick={() => toggleAccordion(index)}
                  className="relative overflow-hidden cursor-pointer bg-gray-100"
                >
                  <div
                    className={`
                      transition-all duration-500 ease-in-out
                      ${isOpen ? "h-[400px]" : "h-[180px]"}
                    `}
                  >
                    <img
                      src={cert.images[0]}
                      alt="certificate"
                      className={`
                        w-full h-full
                        object-contain
                        bg-white
                        p-3
                        transition-transform duration-300
                        ${isOpen ? "scale-105" : "scale-100"}
                      `}
                    />
                  </div>

                  {/* Overlay */}
                  {!isOpen && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-semibold text-sm">
                      Click to View Certificate
                    </div>
                  )}

                  {isOpen && (
                    <div className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full shadow">
                      Click to Close
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-6 bg-gray-50">
                  <div className="space-y-3">
                    {[
                      "University Seal & Signature",
                      "Unique Certificate Number",
                      "Valid for All Purposes",
                      "Government Recognized",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />

                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
         <div className="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto border-2 border-blue-200">
      <div className="flex flex-col md:flex-row items-center gap-8">
        
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-start space-x-4">
            
            {/* Icon */}
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>

           {/* Text */}
<div>
  <h3 className="text-2xl font-bold text-gray-900 mb-3">
    Certificate Authenticity Guaranteed
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    All certificates issued through Xpert Institute are 100% genuine
    and come directly from our authorized university partners.
    Each document is carefully verified before delivery to ensure
    complete accuracy and legal validity.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Our certification process follows strict academic and regulatory
    standards, making our certificates widely accepted by employers,
    government institutions, and higher education authorities across India.
  </p>

  <ul className="space-y-2 text-gray-700 mb-4">
    {[
      "Official university seal and authorized signatures",
      "Unique online verification and tracking number",
      "Recognized for jobs, promotions, and higher studies",
      "Lifetime validity with permanent records",
      "Secure digital and physical copy provided",
      "Issued under government-approved guidelines",
    ].map((item, i) => (
      <li key={i} className="flex items-center">
        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
        {item}
      </li>
    ))}
  </ul>

  <p className="text-sm text-gray-600 italic">
    ⚡ We are committed to transparency, reliability, and student success.
    Your trust is our priority.
  </p>
</div>

          </div>
        </div>

        {/* Right Certificate Image */}
        <div className="flex-1 flex justify-center">
          <div className="border rounded-lg shadow-md overflow-hidden hover:scale-105 transition duration-300">
            
            {/* Replace src with your certificate image */}
            <img
              src={license}
              
              alt="License Certificate"
              className="w-full max-w-sm object-cover"
            />
            
          </div>
        </div>

      </div>
    </div>
      </div>
    </section>
  );
}
