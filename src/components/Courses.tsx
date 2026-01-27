import { BookOpen, Clock, Trophy } from 'lucide-react';

const categorizedCourses = {
  Undergraduate: [
    {
      name: 'B.A',
      fullName: 'Bachelor of Arts',
      duration: '3 Years',
      category: 'Undergraduate',
      description: 'Explore humanities, social sciences, and liberal arts',
    },
    {
      name: 'B.Sc',
      fullName: 'Bachelor of Science',
      duration: '3 Years',
      category: 'Undergraduate',
      description: 'Comprehensive science education across multiple disciplines',
    },
    {
      name: 'B.Com',
      fullName: 'Bachelor of Commerce',
      duration: '3 Years',
      category: 'Undergraduate',
      description: 'Study accounting, finance, taxation, and business fundamentals',
    },
    {
      name: 'BCA',
      fullName: 'Bachelor of Computer Applications',
      duration: '3 Years',
      category: 'Undergraduate',
      description: 'Build a strong foundation in computer science and software development',
    },
  ],

  Postgraduate: [
    {
      name: 'M.A',
      fullName: 'Master of Arts',
      duration: '2 Years',
      category: 'Postgraduate',
      description: 'Advanced study in arts, humanities, and social sciences',
    },
    {
      name: 'M.Sc',
      fullName: 'Master of Science',
      duration: '2 Years',
      category: 'Postgraduate',
      description: 'Research-oriented program in science and technology',
    },
    {
      name: 'M.Com',
      fullName: 'Master of Commerce',
      duration: '2 Years',
      category: 'Postgraduate',
      description: 'Advanced knowledge in commerce, finance, and business management',
    },
    {
      name: 'MCA',
      fullName: 'Master of Computer Applications',
      duration: '2 Years',
      category: 'Postgraduate',
      description: 'Advanced training in software engineering and IT management',
    },
    {
      name: 'MBA',
      fullName: 'Master of Business Administration',
      duration: '2 Years',
      category: 'Postgraduate',
      description: 'Develop leadership and strategic business management skills',
    },
    {
      name: 'M.Ed',
      fullName: 'Master of Education',
      duration: '2 Years',
      category: 'Postgraduate',
      description: 'Advanced study in education theory, research, and leadership',
    },
  ],

  Professional: [
    {
      name: 'B.Pharm',
      fullName: 'Bachelor of Pharmacy',
      duration: '4 Years',
      category: 'Professional',
      description: 'Comprehensive education in pharmaceutical sciences and drug development',
    },
    {
      name: 'D.Pharm',
      fullName: 'Diploma in Pharmacy',
      duration: '2 Years',
      category: 'Professional',
      description: 'Practical training for careers in pharmacy practice and healthcare',
    },
    {
      name: 'PGDCA',
      fullName: 'Post Graduate Diploma in Computer Applications',
      duration: '1 Year',
      category: 'Professional',
      description: 'Career-focused program in computer applications and IT skills',
    },
    {
      name: 'B.Ed',
      fullName: 'Bachelor of Education',
      duration: '2 Years',
      category: 'Professional',
      description: 'Professional training for teaching at secondary and senior secondary levels',
    },
    {
      name: 'D.El.Ed',
      fullName: 'Diploma in Elementary Education',
      duration: '2 Years',
      category: 'Professional',
      description: 'Teacher training program focused on primary and elementary education',
    },
    {
      name: 'BLIS',
      fullName: 'Bachelor of Library & Information Science',
      duration: '1 Year',
      category: 'Professional',
      description: 'Professional training in library management and information systems',
    },
    {
      name: 'MLIS',
      fullName: 'Master of Library & Information Science',
      duration: '1 Year',
      category: 'Professional',
      description: 'Advanced library science and information management',
    },
    {
      name: 'Music',
      fullName: 'Diploma / Degree in Music',
      duration: '1–3 Years',
      category: 'Professional',
      description: 'Develop skills in vocal or instrumental music with theoretical knowledge',
    },
  ],
};

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Course Offerings
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of accredited programs designed to help you achieve your career goals
          </p>
        </div>

        {/* Category-wise Courses */}
        {Object.entries(categorizedCourses).map(([category, courses]) => (
          <div key={category} className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              {category} Courses
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {courses.map((course) => (
                <div
                  key={course.name}
                  className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {course.category}
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {course.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {course.fullName}
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <Trophy className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">
                        Accredited
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
