import { useState } from "react";
import {
  CheckCircle,
  Loader2,
  UserPlus,
  BookOpen,
} from "lucide-react";
import { supabase } from "../lib/supabase";

/* ================= TYPES ================= */
interface FormData {
  student_name: string;
  father_name: string;
  mother_name: string;
  dob: string;
  aadhar_number: string;

  mobile: string;
  alternate_mobile: string;
  father_mobile: string;
  email: string;

  category: string;
  address: string;
  district: string;
  pincode: string;
  state: string;

  tenth_passing_year: string;
  tenth_board: string;
  tenth_marks: string;
  tenth_percent: string;

  twelfth_passing_year: string;
  twelfth_board: string;
  twelfth_marks: string;
  twelfth_percent: string;

  graduation_passing_year: string;
  graduation_university: string;
  graduation_marks: string;
  graduation_percent: string;

  course: string;
  admission_session: string;
}

const courses = ["BCA", "MCA", "BA", "BS", "MA", "MBA", "MS", "BLIS", "MLIS"];

/* ================= REUSABLE UI ================= */
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="
      w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm
      shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200
      outline-none transition
    "
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="
      w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm
      shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200
      outline-none transition
    "
  />
);

const Section = ({ title, children }: { title: string; children: any }) => (
  <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 space-y-4">
    <h4 className="text-lg font-semibold text-blue-700">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

/* ================= MAIN COMPONENT ================= */
export default function EnrollmentForm() {
  const [formData, setFormData] = useState<FormData>({
    student_name: "",
    father_name: "",
    mother_name: "",
    dob: "",
    aadhar_number: "",

    mobile: "",
    alternate_mobile: "",
    father_mobile: "",
    email: "",

    category: "",
    address: "",
    district: "",
    pincode: "",
    state: "",

    tenth_passing_year: "",
    tenth_board: "",
    tenth_marks: "",
    tenth_percent: "",

    twelfth_passing_year: "",
    twelfth_board: "",
    twelfth_marks: "",
    twelfth_percent: "",

    graduation_passing_year: "",
    graduation_university: "",
    graduation_marks: "",
    graduation_percent: "",

    course: "",
    admission_session: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const payload = {
    ...formData,
    created_at: new Date().toISOString() // automatically add current timestamp
  };

  const { error } = await supabase
    .from("student_enrollments")
    .insert([payload]);

  if (error) {
    alert(error.message);
  } else {
    setIsSuccess(true);
  }

  setIsSubmitting(false);
};

  /* ================= SUCCESS SCREEN ================= */
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-xl text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Admission Submitted Successfully</h2>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Add Another Student
        </button>
      </div>
    );
  }

  /* ================= FORM ================= */
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-2xl space-y-6"
    >
      <div className="flex items-center gap-3">
        <UserPlus className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold">Student Admission Form</h2>
      </div>

      <Section title="Personal Details">
        <Input name="student_name" placeholder="Student Name" onChange={handleChange} />
        <Input name="father_name" placeholder="Father Name" onChange={handleChange} />
        <Input name="mother_name" placeholder="Mother Name" onChange={handleChange} />
        <Input type="date" name="dob" onChange={handleChange} />
        <Input name="aadhar_number" placeholder="Aadhar Number" onChange={handleChange} />
      </Section>

      <Section title="Contact Details">
        <Input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
        <Input name="alternate_mobile" placeholder="Alternate Mobile" onChange={handleChange} />
        <Input name="father_mobile" placeholder="Father Mobile" onChange={handleChange} />
        <Input name="email" placeholder="Email ID" onChange={handleChange} />
      </Section>

      <Section title="Address Details">
        <Textarea name="address" placeholder="Complete Address" onChange={handleChange} />
        <Input name="district" placeholder="District" onChange={handleChange} />
        <Input name="pincode" placeholder="Pin Code" onChange={handleChange} />
        <Input name="state" placeholder="State" onChange={handleChange} />
      </Section>

      <Section title="10th Academic Details">
        <Input name="tenth_passing_year" placeholder="Passing Year" onChange={handleChange} />
        <Input name="tenth_board" placeholder="Board" onChange={handleChange} />
        <Input name="tenth_marks" placeholder="Marks" onChange={handleChange} />
        <Input name="tenth_percent" placeholder="Percentage %" onChange={handleChange} />
      </Section>

      <Section title="12th Academic Details">
        <Input name="twelfth_passing_year" placeholder="Passing Year" onChange={handleChange} />
        <Input name="twelfth_board" placeholder="Board" onChange={handleChange} />
        <Input name="twelfth_marks" placeholder="Marks" onChange={handleChange} />
        <Input name="twelfth_percent" placeholder="Percentage %" onChange={handleChange} />
      </Section>

      <Section title="Graduation Details">
        <Input name="graduation_passing_year" placeholder="Passing Year" onChange={handleChange} />
        <Input name="graduation_university" placeholder="University" onChange={handleChange} />
        <Input name="graduation_marks" placeholder="Marks" onChange={handleChange} />
        <Input name="graduation_percent" placeholder="Percentage %" onChange={handleChange} />
      </Section>
      <Section title="Category">
  <div className="relative">
    <select
      name="category"
      onChange={handleChange}
      className="
        w-full rounded-md border border-gray-300 bg-white py-2 px-4
        text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200
        outline-none transition
      "
    >
      <option value="">Select Category</option>
      <option value="General">General</option>
      <option value="OBC">OBC</option>
      <option value="SC">SC</option>
      <option value="ST">ST</option>
      <option value="EBC">EBC</option>
    </select>
  </div>
</Section>


      <Section title="Course & Admission Session">
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            name="course"
            onChange={handleChange}
            className="
              w-full appearance-none rounded-md border border-gray-300
              bg-white py-2 pl-10 pr-4 text-sm shadow-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200
              outline-none transition
            "
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <Input
          name="admission_session"
          placeholder="Admission Session (2024–25)"
          onChange={handleChange}
        />
      </Section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full bg-blue-600 text-white py-4 rounded-lg font-semibold
          flex justify-center items-center gap-2 hover:bg-blue-700 transition
        "
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : <UserPlus />}
        {isSubmitting ? "Submitting..." : "Submit Admission"}
      </button>
    </form>
  );
}
