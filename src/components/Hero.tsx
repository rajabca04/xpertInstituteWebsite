import { Award, BookOpen, Users } from 'lucide-react';

export default function Hero() {


  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Future with
              <span className="block text-blue-600 mt-2">Quality Education</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful students who have achieved their academic dreams through our
              authorized university programs. Accredited courses, flexible learning, and recognized degrees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button
                onClick={scrollToEnroll}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                Enroll Now
              </button> */}
              <button
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all"
              >
                Explore Courses
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Authorized Programs</h3>
              <p className="text-gray-600 leading-relaxed">
                Partnered with 4 prestigious universities offering fully accredited degree programs
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Diverse Courses</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from 9 comprehensive programs including BCA, MCA, MBA, and more
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+ Students</h3>
              <p className="text-gray-600 leading-relaxed">
                Join our community of successful graduates now working in top companies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
