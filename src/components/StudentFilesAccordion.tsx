import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ChevronDown, Download } from "lucide-react";

interface Student {
  id: number;
  student_name: string;
  course: string;
}

interface StudentFile {
  id: number;
  student_id: number;
  file_type: string;
  file_url: string;
  uploaded_at: string;
}

interface Props {
  studentId: number;
}

export default function StudentFilesAccordion({ studentId }: Props) {
  const [student, setStudent] = useState<Student | null>(null);
  const [files, setFiles] = useState<StudentFile[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // fetch student info
      const { data: studentData, error: studentError } = await supabase
        .from("student_enrollments")
        .select("id, student_name, course")
        .eq("id", studentId)
        .single();

      if (studentError) {
        console.error(studentError.message);
      } else {
        setStudent(studentData);
      }

      // fetch files
      const { data: filesData, error: filesError } = await supabase
        .from("student_files")
        .select("*")
        .eq("student_id", studentId)
        .order("uploaded_at", { ascending: true });

      if (filesError) {
        console.error(filesError.message);
      } else {
        setFiles(filesData || []);
      }
    };

    fetchData();
  }, [studentId]);

  if (!student) return <p>Loading student info...</p>;

  return (
    <div className="max-w-5xl mx-auto my-4">
      {/* Accordion Header */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow-md"
      >
        <div>
          <h3 className="text-lg font-semibold">{student.student_name}</h3>
          <p className="text-sm text-gray-600">{student.course}</p>
        </div>
        <ChevronDown className={`w-6 h-6 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {/* Accordion Body */}
      {open && (
        <div className="bg-gray-50 p-4 mt-2 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => {
            const isImage = file.file_type.includes("image");
            const isPDF = file.file_type.includes("pdf");
            return (
              <div
                key={file.id}
                className="border rounded-lg p-2 flex flex-col items-center shadow-sm"
              >
                {/* File Preview */}
                {isImage ? (
                  <img
                    src={`${supabase.storage.from("Xpert Institute - Storage").getPublicUrl(file.file_url).data.publicUrl}`}
                    alt={file.file_type}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                ) : isPDF ? (
                  <div className="flex flex-col items-center justify-center w-full h-32 bg-gray-200 rounded-md mb-2">
                    <span className="text-gray-600 font-semibold">PDF</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-32 bg-gray-200 rounded-md mb-2">
                    <span className="text-gray-600 font-semibold">File</span>
                  </div>
                )}

                {/* File Name */}
                <p className="text-sm text-gray-700 truncate">{file.file_url.split("/").pop()}</p>

                {/* Download Button */}
                <a
                  href={`${supabase.storage.from("Xpert Institute - Storage").getPublicUrl(file.file_url).data.publicUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg flex items-center gap-1 hover:bg-blue-700 transition"
                  download
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
