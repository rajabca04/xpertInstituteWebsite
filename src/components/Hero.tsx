import { Award, BookOpen, Users, ArrowRight } from "lucide-react";
import student from "../Sample-certifucate/student-background.jpeg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-52 pb-20"
      style={{
        backgroundImage: `url(${student})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Heading Section */}
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
              Trusted Education Partner
            </span>

            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Transform Your Future with
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Quality Education
              </span>
            </h2>

            <p className="text-2xl font-semibold text-gray-900 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful students who achieved their academic
              goals through our authorized university programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("courses")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-9 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>

              <button
               onClick={() =>
                  document
                    .getElementById("contact-us")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              className="bg-white text-blue-600 px-9 py-4 rounded-xl text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all">
                Contact Us
              </button>
            </div>
          </div>

          {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
  {[
    {
      icon: Award,
      title: "Authorized Programs",
      text: "Government-approved and accredited degrees.",
    },
    {
      icon: BookOpen,
      title: "Wide Range of Courses",
      text: "Multiple UG & PG programs available.",
    },
    {
      icon: Users,
      title: "1000+ Students",
      text: "Successful graduates nationwide.",
    },
  ].map((item, i) => (
    <div
      key={i}
      className="group relative bg-white/10 backdrop-blur-0 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-blue-200 hover:text-blue-500"
    >
      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
        <item.icon className="w-8 h-8" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-extrabold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-blue-600">
        {item.title}
      </h3>

      {/* Text */}
      <p className="text-gray-100 leading-relaxed mb-4">{item.text}</p>

      {/* Optional Arrow */}
     
    </div>
  ))}
</div>


        </div>
      </div>
    </section>
  );
}
