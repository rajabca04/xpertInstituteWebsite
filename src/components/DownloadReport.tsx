import { useState, useEffect } from "react";
import { ChevronDown, Download, Loader2, User, Folder } from "lucide-react";
import { supabase } from "../lib/supabase";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface Student {
  id: number;
  student_name: string;
  course: string;
  mobile: string;
  father_name: string;
}

interface StudentFile {
  id: number;
  student_id: number;
  file_type: string;
  file_url: string;
  uploaded_at: string;
}

const PAGE_LIMIT = 10;

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filesMap, setFilesMap] = useState<Record<number, StudentFile[]>>({});
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [page, setPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);

  /* ================= FETCH STUDENTS ================= */
  const fetchStudents = async (page: number) => {
    setLoadingStudents(true);
    const from = (page - 1) * PAGE_LIMIT;
    const to = from + PAGE_LIMIT - 1;

    const { data, count, error } = await supabase
      .from("student_enrollments")
      .select("id, student_name, course, mobile, father_name", { count: "exact" })
      .order("student_name", { ascending: true })
      .range(from, to);

    if (error) console.error(error);
    else {
      setStudents(data || []);
      setTotalStudents(count || 0);
    }
    setLoadingStudents(false);
  };

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  /* ================= FETCH FILES ================= */
  const fetchFiles = async (studentId: number) => {
    setLoadingMap((prev) => ({ ...prev, [studentId]: true }));
    const { data, error } = await supabase
      .from("student_files")
      .select("*")
      .eq("student_id", studentId);

    if (error) console.error(error);
    else setFilesMap((prev) => ({ ...prev, [studentId]: data || [] }));
    setLoadingMap((prev) => ({ ...prev, [studentId]: false }));
  };

  const getPublicUrl = (filePath: string) =>
    supabase.storage.from("Xpert Institute - Storage").getPublicUrl(filePath).data.publicUrl;

  /* ================= TOGGLE ACCORDION ================= */
  const toggleAccordion = (studentId: number) => {
    if (expandedId === studentId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(studentId);
    if (!filesMap[studentId]) fetchFiles(studentId);
  };

  /* ================= DOWNLOAD ALL FILES ================= */
  const downloadAllFiles = async (studentId: number) => {
    const files = filesMap[studentId];
    if (!files || files.length === 0) return;

    const zip = new JSZip();

    for (const file of files) {
      const url = getPublicUrl(file.file_url);
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = file.file_url.split("/").pop() || "file";
      zip.file(fileName, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const studentName = students.find((s) => s.id === studentId)?.student_name || "student";
    saveAs(content, `${studentName}_files.zip`);
  };

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(totalStudents / PAGE_LIMIT);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-blue-600">
          <h1 className="text-xl font-bold">Xpert Institute</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="flex items-center gap-2 p-2 rounded hover:bg-blue-600 cursor-pointer">
            <Folder className="w-5 h-5" />
            <span>All Student Enrollments</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard - Students & Files</h2>

        {loadingStudents && (
          <div className="flex items-center justify-center py-10 text-gray-500">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading students...
          </div>
        )}

        {!loadingStudents && students.length === 0 && (
          <p className="text-gray-600">No students found.</p>
        )}

        <div className="space-y-4">
          {students.map((student) => {
            const isOpen = expandedId === student.id;
            const files = filesMap[student.id] || [];
            const isLoadingFiles = loadingMap[student.id];

            return (
              <div key={student.id} className="border rounded-lg shadow-sm overflow-hidden bg-white">
                {/* Accordion Header */}
                <div
                  onClick={() => toggleAccordion(student.id)}
                  className="cursor-pointer flex justify-between items-center bg-blue-100 p-4 hover:bg-blue-200 transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{student.student_name}</h3>
                    <p className="text-sm text-gray-700">
                      {student.course} | Mobile: {student.mobile} | Father: {student.father_name}
                    </p>
                  </div>
                  <ChevronDown className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="bg-gray-50 p-4">
                    {isLoadingFiles ? (
                      <div className="flex items-center justify-center py-10 text-gray-500">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading files...
                      </div>
                    ) : files.length === 0 ? (
                      <p className="text-gray-600 text-center">No files uploaded</p>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                          {files.map((file) => {
                            const isImage = file.file_type.includes("image");
                            const isPDF = file.file_type.includes("pdf");
                            const publicUrl = getPublicUrl(file.file_url);

                            return (
                              <div
                                key={file.id}
                                className="border rounded-lg p-2 flex flex-col items-center shadow-sm"
                              >
                                {isImage ? (
                                  <img
                                    src={publicUrl}
                                    alt={file.file_type}
                                    className="w-full h-32 object-cover rounded-md mb-2"
                                  />
                                ) : isPDF ? (
                                  <iframe
                                    src={publicUrl}
                                    title={file.file_type}
                                    className="w-full h-32 rounded-md mb-2"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center w-full h-32 bg-gray-200 rounded-md mb-2">
                                    <span className="text-gray-600 font-semibold">File</span>
                                  </div>
                                )}

                                <p className="text-sm text-gray-700 truncate">{file.file_url.split("/").pop()}</p>
                                <a
                                  href={publicUrl}
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

                        <button
                          onClick={() => downloadAllFiles(student.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
                        >
                          <Download className="w-5 h-5" /> Download All Files
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  page === idx + 1 ? "bg-blue-800 text-white" : "bg-blue-100 text-gray-700 hover:bg-blue-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
