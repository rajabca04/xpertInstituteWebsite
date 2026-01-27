import { Award, CheckCircle, Shield } from 'lucide-react';

const certificates = [
  {
    title: 'MCA Degree Certificate',
    university: 'Manandlayatan University',
    color: 'from-blue-500 to-blue-700',
  },
  {
    title: 'MBA Degree Certificate',
    university: 'Asian University',
    color: 'from-green-500 to-green-700',
  },
  {
    title: 'BCA Degree Certificate',
    university: 'Subharthi University',
    color: 'from-purple-500 to-purple-700',
  },
  {
    title: 'MA Degree Certificate',
    university: 'Sikkim University',
    color: 'from-red-500 to-red-700',
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sample Certificates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            View authentic degree certificates from our partner universities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 group"
            >
              <div className={`bg-gradient-to-r ${cert.color} p-8 text-white relative`}>
                <div className="absolute top-4 right-4 opacity-20">
                  <Award className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="w-6 h-6" />
                    <span className="text-sm font-semibold">AUTHENTIC CERTIFICATE</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>
                  <p className="text-blue-100">{cert.university}</p>
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm">University Seal & Signature</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm">Unique Certificate Number</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm">Valid for All Purposes</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm">Government Recognized</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border-2 border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Certificate Authenticity Guaranteed
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All certificates issued through Xpert Institute are 100% genuine and come directly
                from our authorized university partners. Each certificate includes:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Official university seal and authorized signatures
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Unique verification number for online verification
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Valid for government jobs, higher education, and employment
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Lifetime validity with university records maintained
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
