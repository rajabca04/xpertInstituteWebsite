import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    course: 'MCA Graduate',
    university: 'Manandlayatan University',
    rating: 5,
    text: 'Xpert Institute changed my life. The flexible learning schedule allowed me to work while studying, and the quality of education was outstanding. I secured a job at a top IT company within a month of graduation.',
    year: '2023',
  },
  {
    name: 'Priya Sharma',
    course: 'MBA Graduate',
    university: 'Asian University',
    rating: 5,
    text: 'The MBA program was comprehensive and practical. The faculty support was excellent, and the study materials were top-notch. I highly recommend Xpert Institute to anyone looking for quality distance education.',
    year: '2023',
  },
  {
    name: 'Amit Verma',
    course: 'BCA Student',
    university: 'Subharthi University',
    rating: 5,
    text: 'As a working professional, this institute was perfect for me. The enrollment process was smooth, and the support staff was always helpful. The degree is recognized and helped me get a promotion.',
    year: '2024',
  },
  {
    name: 'Sneha Patel',
    course: 'MA Graduate',
    university: 'Sikkim University',
    rating: 5,
    text: 'Xpert institute with genuine degrees. The course content was relevant and updated. I completed my MA while managing my family responsibilities. Thank you Xpert Institute for making education accessible.',
    year: '2023',
  },
  {
    name: 'Vikash Singh',
    course: 'MLIS Graduate',
    university: 'Manandlayatan University',
    rating: 5,
    text: 'Best decision I made for my career in library science. The practical knowledge and theoretical understanding I gained helped me secure a government job. The degree is valid and recognized everywhere.',
    year: '2022',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our graduates who have transformed their careers and achieved their dreams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-blue-100 hover:border-blue-300 group"
            >
              <Quote className="w-10 h-10 text-blue-600 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />

              <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

              <div className="border-t-2 border-blue-100 pt-4">
                <StarRating rating={testimonial.rating} />
                <h4 className="text-lg font-bold text-gray-900 mt-3">{testimonial.name}</h4>
                <p className="text-sm text-blue-600 font-semibold">{testimonial.course}</p>
                <p className="text-sm text-gray-600">{testimonial.university}</p>
                <p className="text-xs text-gray-500 mt-1">Graduated {testimonial.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 px-6 py-3 rounded-full">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-lg font-bold text-gray-900">4.9/5.0</span>
            <span className="text-gray-600">Average Rating from 1000+ Students</span>
          </div>
        </div>
      </div>
    </section>
  );
}
