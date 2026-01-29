import { useState } from "react";
import { CheckCircle, Loader2, UserPlus, BookOpen } from "lucide-react";
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

  // total_fee_paid?: string; // optional
}

interface FilesData {
  passport_photo: File | null;
  tenth_marksheet: File | null;
  twelfth_marksheet: File | null;
  graduation_marksheet: File | null;
  signature_photo: File | null;
  // fee_screenshot?: File | null;
}

const courses = [
  "BCA",
  "MCA",
  "BA",
  "BS",
  "MA",
  "MBA",
  "MS",
  "BLIS",
  "MLIS",
  "BBA",
  "B.Com",
  "M.Com",
  "B.Sc",
  "M.Sc",
  "B.ed",
  "D.lid",
  "M.ed",
  "PGDCA",
  "B.pharma",
  "D.pharma",
  "M.pharma",
  "PHD",
];

/* ================= REUSABLE UI ================= */
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
  />
);

const Section = ({ title, children }: { title: string; children: any }) => (
  <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 space-y-4">
    <h4 className="text-lg font-semibold text-blue-700">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
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
    // total_fee_paid: "",
  });

  const [filesData, setFilesData] = useState<FilesData>({
    passport_photo: null,
    tenth_marksheet: null,
    twelfth_marksheet: null,
    graduation_marksheet: null,
    signature_photo: null,
    // fee_screenshot: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* ================= HANDLE FORM CHANGE ================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= HANDLE FILE CHANGE ================= */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (e.target.name === "passport_photo" && file.size > 200 * 1024) {
      alert("Passport photo must be less than 200KB");
      e.target.value = "";
      return;
    }

    setFilesData((prev) => ({ ...prev, [e.target.name]: file }));
  };

  /* ================= UPLOAD FILE TO SUPABASE ================= */
  const uploadFile = async (file: File, folder: string) => {
    const filePath = `${folder}/${file.name}`;
    const { data, error } = await supabase.storage
      .from("Xpert Institute - Storage")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (error) throw error;
    return data.path;
  };

  /* ================= HANDLE FORM SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ================= VALIDATE REQUIRED FIELDS =================
    const requiredFields = [
      "student_name",
      "father_name",
      "mother_name",
      "dob",
      "aadhar_number",
      "mobile",
      "father_mobile",
      "email",
      "category",
      "tenth_passing_year",
      "tenth_board",
      "tenth_marks",
      "tenth_percent",
      "twelfth_passing_year",
      "twelfth_board",
      "twelfth_marks",
      "twelfth_percent",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        alert("Please fill all mandatory fields before submitting.");
        setIsSubmitting(false);
        return;
      }
    }

    // Validate required files
    const requiredFiles = [
      "passport_photo",
      "tenth_marksheet",
      "twelfth_marksheet",
      "graduation_marksheet",
      "signature_photo",
    ];
    for (const key of requiredFiles) {
      if (!filesData[key as keyof FilesData]) {
        alert(`Please upload ${key.replace("_", " ")}`);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // ================= INSERT STUDENT =================
      const { data: studentData, error: studentError } = await supabase
        .from("student_enrollments")
        .insert([{ ...formData, created_at: new Date().toISOString() }])
        .select("id")
        .single();

      if (studentError) throw studentError;

      const studentId = studentData.id;

      // ================= UPLOAD FILES =================
      const uploadedFiles: Record<string, string> = {};

      // create a folder name based on current date and time
      const now = new Date();
      const folderName = `${formData.student_name.replace(/\s+/g, "_")}_${now.getFullYear()}${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(
          2,
          "0",
        )}${now.getDate().toString().padStart(2, "0")}_${now.getHours().toString().padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;

      for (const key in filesData) {
        const file = filesData[key as keyof FilesData];
        if (file) {
          // upload file into folder with date-time
          const path = await uploadFile(file, folderName);
          uploadedFiles[key] = path;
        }
      }

      // ================= INSERT FILE RECORDS =================
      const filesToInsert = Object.entries(uploadedFiles).map(
        ([key, path]) => ({
          student_id: studentId,
          file_type: key,
          file_url: path,
        }),
      );

      const { error: filesError } = await supabase
        .from("student_files")
        .insert(filesToInsert);

      if (filesError) throw filesError;

      setIsSuccess(true);
    } catch (err: any) {
      alert(err.message);
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
      id="enroll"
      onSubmit={handleSubmit}
      className="scroll-mt-28 max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-2xl space-y-6"
    >
      <div className="flex items-center gap-3">
        <UserPlus className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold">Student Enrollment Form - Xpert Institute </h2>
      </div>

      {/* ================= PERSONAL DETAILS ================= */}
      <Section title="Personal Details">
        <Input
          name="student_name"
          placeholder="Student Name"
          required
          onChange={handleChange}
        />
        <Input
          name="father_name"
          placeholder="Father Name"
          required
          onChange={handleChange}
        />
        <Input
          name="mother_name"
          placeholder="Mother Name"
          required
          onChange={handleChange}
        />
        <Input type="date" name="dob" required onChange={handleChange} />
        <Input
          name="aadhar_number"
          placeholder="Aadhar Number"
          required
          onChange={handleChange}
        />
      </Section>

      {/* ================= CONTACT DETAILS ================= */}
      <Section title="Contact Details">
        <Input
          name="mobile"
          placeholder="Mobile Number"
          required
          onChange={handleChange}
        />
        <Input
          name="alternate_mobile"
          placeholder="Alternate Mobile"
          onChange={handleChange}
        />
        <Input
          name="father_mobile"
          placeholder="Father Mobile"
          required
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email ID"
          type="email"
          required
          onChange={handleChange}
        />
      </Section>

      {/* ================= ADDRESS DETAILS ================= */}
      <Section title="Address Details">
        <Textarea
          name="address"
          placeholder="Complete Address"
          onChange={handleChange}
        />
        <Input name="district" placeholder="District" onChange={handleChange} />
        <Input name="pincode" placeholder="Pin Code" onChange={handleChange} />
        <Input name="state" placeholder="State" onChange={handleChange} />
      </Section>

      {/* ================= 10TH ACADEMIC ================= */}
      <Section title="10th Academic Details">
        <Input
          name="tenth_passing_year"
          placeholder="Passing Year"
          required
          onChange={handleChange}
        />
        <Input
          name="tenth_board"
          placeholder="Board"
          required
          onChange={handleChange}
        />
        <Input
          name="tenth_marks"
          placeholder="Marks"
          required
          onChange={handleChange}
        />
        <Input
          name="tenth_percent"
          placeholder="Percentage %"
          required
          onChange={handleChange}
        />
      </Section>

      {/* ================= 12TH ACADEMIC ================= */}
      <Section title="12th Academic Details">
        <Input
          name="twelfth_passing_year"
          placeholder="Passing Year"
          required
          onChange={handleChange}
        />
        <Input
          name="twelfth_board"
          placeholder="Board"
          required
          onChange={handleChange}
        />
        <Input
          name="twelfth_marks"
          placeholder="Marks"
          required
          onChange={handleChange}
        />
        <Input
          name="twelfth_percent"
          placeholder="Percentage %"
          required
          onChange={handleChange}
        />
      </Section>

      {/* ================= GRADUATION DETAILS ================= */}
      <Section title="Graduation Details">
        <Input
          name="graduation_passing_year"
          placeholder="Passing Year"
          onChange={handleChange}
        />
        <Input
          name="graduation_university"
          placeholder="University"
          onChange={handleChange}
        />
        <Input
          name="graduation_marks"
          placeholder="Marks"
          onChange={handleChange}
        />
        <Input
          name="graduation_percent"
          placeholder="Percentage %"
          onChange={handleChange}
        />
      </Section>

      {/* ================= CATEGORY ================= */}
      <Section title="Category">
        <select
          name="category"
          required
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm"
        >
          <option value="">Select Category</option>
          <option value="General">General</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="EBC">EBC</option>
        </select>
      </Section>

      {/* ================= COURSE & SESSION ================= */}
      <Section title="Course & Admission Session">
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            name="course"
            onChange={handleChange}
            className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
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

      {/* ================= FILE UPLOAD ================= */}
      <Section title="Upload Documents">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Passport Photo (≤200KB)
          </label>
          <Input
            type="file"
            name="passport_photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            10th Marksheet
          </label>
          <Input
            type="file"
            name="tenth_marksheet"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            12th Marksheet
          </label>
          <Input
            type="file"
            name="twelfth_marksheet"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Graduation Marksheet
          </label>
          <Input
            type="file"
            name="graduation_marksheet"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Signature Photo
          </label>
          <Input
            type="file"
            name="signature_photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fee Screenshot (Optional)
          </label>
          <Input
            type="file"
            name="fee_screenshot"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </div>
        {/* <Input name="total_fee_paid" placeholder="Total Fee Paid (Optional)" onChange={handleChange} /> */}
      </Section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold flex justify-center items-center gap-2 hover:bg-blue-700 transition"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : <UserPlus />}
        {isSubmitting ? "Submitting..." : "Submit Admission"}
      </button>
    </form>
  );
}
