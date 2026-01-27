import { useState } from "react";
import { CheckCircle, Loader2, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabase";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  address: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  course?: string;
  address?: string;
}

const courses = ["BCA", "MCA", "BA", "BS", "MA", "MBA", "MS", "BLIS", "MLIS"];

export default function EnrollmentForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Complete address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("student_enrollments")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            course: formData.course,
            address: formData.address,
          },
        ])
        .select();

      if (error) throw error;

      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: "",
        address: "",
      });
      setErrors({});

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your enrollment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <section
        id="enroll"
        className="py-20 bg-gradient-to-br from-green-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-12 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enrollment Successful!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for enrolling at Xpert Institute. Our admission team
              will contact you within 24 hours to guide you through the next
              steps.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Submit Another Enrollment
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="enroll"
      className="py-20 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Enroll Now
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take the first step towards your educational goals. Fill out the
            form below to start your enrollment process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 border-2 border-blue-100">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Student Enrollment Form
              </h3>
              <p className="text-sm text-gray-600">All fields are required</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="10-digit mobile number"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="course"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Select Course
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.course ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Choose a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="text-red-600 text-sm mt-1">{errors.course}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Complete Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your complete address including city, state, and pincode"
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-6 h-6" />
                  <span>Submit Enrollment</span>
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            By submitting this form, you agree to our terms and conditions. We
            will contact you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
