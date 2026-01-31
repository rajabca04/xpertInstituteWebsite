import { Building2, CheckCircle, BadgeCheck } from 'lucide-react';
const universities = [
  {
    name: "Mangalayatan University",
    location: "Aligarh, Uttar Pradesh",
    established: "2006",
    accreditation: "UGC Recognized, NAAC A+ Grade",
  },
  {
    name: "Asian Global Eduversity",
    location: "Panchkula, Haryana",
    established: "2012",
    accreditation: "UGC Recognized (Section 2(f) UGC Act)",
  },
  {
    name: "Swami Vivekanand Subharti University",
    location: "Meerut, Uttar Pradesh",
    established: "2008",
    accreditation: "UGC Recognized",
  },
  {
    name: "Ras Bihari Bose Subharti University",
    location: "Dehradun, Uttarakhand",
    established: "2016",
    accreditation: "UGC Recognized, NAAC Accredited",
  },
  {
    name: "Sikkim University",
    location: "Gangtok, Sikkim",
    established: "2007",
    accreditation: "UGC, NAAC (Central University)",
  },
  {
    name: "Radha Govind University",
    location: "Ramgarh, Jharkhand",
    established: "2018",
    accreditation: "UGC Recognized (Private University)",
  },
  {
    name: "Maulana Mazharul Haque Arabic & Persian University",
    location: "Patna, Bihar",
    established: "1998",
    accreditation: "UGC Recognized (State University)",
  },
];

export default function Partners() {
  return (
    <section id="partners" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Authorized University Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are proud to partner with prestigious universities that ensure the quality and recognition
            of your degree
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {universities.map((university) => (
            <div
              key={university.name}
              className="relative bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-200 group overflow-hidden"
            >
              {/* ✅ ASSURED STAMP */}
              <div className="absolute -top-3 -right-3 rotate-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-indigo-500 flex flex-col items-center justify-center text-white shadow-xl ring-4 ring-blue-100">
                  <BadgeCheck className="w-6 h-6 mb-1" />
                  <span className="text-[8px] font-bold tracking-wide">
                    XPERT
                  </span>
                  <span className="text-[7px] font-semibold">
                    ASSURED
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {university.name}
                  </h3>

                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Location: {university.location}
                    </p>

                    <p className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      Established: {university.established}
                    </p>

                    <p className="text-green-600 flex items-center font-semibold">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {university.accreditation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-blue-100 border-2 border-blue-200 rounded-xl p-6 max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-bold text-blue-600">Important:</span> All our university partners are
              recognized and offer degrees that are valid for government jobs, higher education, and
              professional opportunities across India and abroad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
