import { Award, BookOpen, Users, ArrowRight } from "lucide-react";
import desktopHero from "../Sample-certifucate/student-background.jpeg";
import mobileHero from "../Sample-certifucate/student-background.jpeg"; // <-- separate mobile image

export default function Hero() {
  return (
    <section id="home" className="relative pt-44 md:pt-28 pb-20">
      {/* Mobile Hero Image */}
      <div className="sm:hidden relative">
        <img
          src={mobileHero}
          alt="Mobile Hero"
          className="w-full  object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
          <span className="inline-block mb-0 px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
            Trusted Education Partner
          </span>

          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Transform Your Future with
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Quality Education
            </span>
          </h2>

          <p className="text-lg font-semibold text-gray-900 mb-6 leading-relaxed">
            Join thousands of successful students who achieved their academic
            goals through our authorized university programs.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("courses")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:shadow-xl transition-all"
            >
              Explore Courses
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("contact-us")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-blue-600 px-6 py-3 rounded-xl text-base font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Hero Image */}
      <div
        className="hidden sm:block absolute inset-0 object-contain"
        style={{
          backgroundImage: `url(${desktopHero})`,
          // backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-50"></div>
      </div>

      {/* Content (common for both) */}
      <div className="relative z-10 container mx-auto px-4 mb-40">
        <div className="max-w-7xl mx-auto text-center sm:text-left">
          <div className="hidden sm:block">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
              Trusted Education Partner
            </span>

            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Transform Your Future with
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Quality Education
              </span>
            </h2>

            <p className="text-2xl font-semibold text-gray-900 mb-10 max-w-3xl leading-relaxed">
              Join thousands of successful students who achieved their academic
              goals through our authorized university programs.
            </p>

            <div className="flex gap-5">
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
                className="bg-white text-blue-600 px-9 py-4 rounded-xl text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all"
              >
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
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: BookOpen,
                title: "Wide Range of Courses",
                text: "Multiple UG & PG programs available.",
                color: "from-green-400 to-teal-500",
              },
              {
                icon: Users,
                title: "1000+ Students",
                text: "Successful graduates nationwide.",
                color: "from-yellow-400 to-orange-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-blue-200 bg-gradient-to-tr bg-opacity-20 hover:bg-opacity-30"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-tr ${item.color} rounded-xl flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="text-gray-800 leading-relaxed mb-4">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
