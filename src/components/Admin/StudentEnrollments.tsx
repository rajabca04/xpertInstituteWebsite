import { useEffect, useState } from "react";
import {
  ChevronDown,
  Download,
  Loader2,
  Moon,
  Sun,
  Search,
  Users,
  Folder,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { supabase } from "../../lib/supabase";

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
}

const LIMIT = 10;

export default function StudentEnrollments() {
  const [students, setStudents] = useState<Student[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filesMap, setFilesMap] = useState<Record<number, StudentFile[]>>({});
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  const [search, setSearch] = useState("");

  /* 🌙 DARK MODE */
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* 📊 STATS */
  const fetchStats = async () => {
    const { count: studentCount } = await supabase
      .from("student_enrollments")
      .select("*", { count: "exact", head: true });

    const { count: fileCount } = await supabase
      .from("student_files")
      .select("*", { count: "exact", head: true });

    setTotalStudents(studentCount || 0);
    setTotalFiles(fileCount || 0);
  };

  /* 👨‍🎓 STUDENTS */
  const fetchStudents = async () => {
    setLoading(true);

    const from = (page - 1) * LIMIT;
    const to = from + LIMIT - 1;

    let query = supabase
      .from("student_enrollments")
      .select("id, student_name, course, mobile, father_name", {
        count: "exact",
      })
      .order("student_name")
      .range(from, to);

    if (search.trim()) {
      query = query.ilike("student_name", `%${search}%`);
    }

    const { data, count } = await query;

    setStudents(data || []);
    setTotalStudents(count || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, [page, search]);

  /* 📂 FILES */
  const fetchFiles = async (studentId: number) => {
    setLoadingMap((p) => ({ ...p, [studentId]: true }));

    const { data } = await supabase
      .from("student_files")
      .select("*")
      .eq("student_id", studentId);

    setFilesMap((p) => ({ ...p, [studentId]: data || [] }));
    setLoadingMap((p) => ({ ...p, [studentId]: false }));
  };

  const getUrl = (path: string) =>
    supabase.storage.from("Xpert Institute - Storage").getPublicUrl(path).data
      .publicUrl;

  /* ⬇️ DOWNLOAD ALL */
  const downloadAll = async (id: number) => {
    const zip = new JSZip();
    for (const f of filesMap[id]) {
      const res = await fetch(getUrl(f.file_url));
      zip.file(f.file_url.split("/").pop()!, await res.blob());
    }
    saveAs(await zip.generateAsync({ type: "blob" }), "documents.zip");
  };

  const pages = Math.ceil(totalStudents / LIMIT);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold">Enrollments</h1>
        {/* SEARCH */}
        <div className="flex justify-center items-center gap-4">
          <div className="px-6 mb-4">
            <div className="relative border-blue-500">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search student..."
                className="w-full pl-10 p-2 rounded border dark:bg-gray-800"
              />
            </div>
          </div>
        </div>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
        <Stat icon={<Users />} label="Total Students" value={totalStudents} />
        <Stat icon={<Folder />} label="Total Files" value={totalFiles} />
      </div>

      {/* LIST */}
      <div className="px-4 sm:px-6 h-[calc(100vh-2rem)] overflow-y-auto space-y-4">
        {loading && <Loader2 className="animate-spin mx-auto" />}

        {students.map((s) => (
          <div
            key={s.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden"
          >
            {/* HEADER */}
            <div
              onClick={() => {
                setExpandedId(expandedId === s.id ? null : s.id);
                if (!filesMap[s.id]) fetchFiles(s.id);
              }}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {s.student_name}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {s.course} • {s.mobile} • {s.father_name}
                </p>
              </div>

              <ChevronDown
                className={`transition-transform ${
                  expandedId === s.id ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* CONTENT */}
            {expandedId === s.id && (
              <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                {loadingMap[s.id] ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  <>
                    {/* FILE GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filesMap[s.id]?.map((f) => {
                        const url = getUrl(f.file_url);
                        const isImage = f.file_type.includes("image");
                        const isPdf = f.file_type.includes("pdf");

                        return (
                          <div
                            key={f.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 flex flex-col"
                          >
                            {/* PREVIEW */}
                            {isImage ? (
                              <img
                                src={url}
                                loading="lazy"
                                className="h-28 w-full object-cover rounded"
                              />
                            ) : (
                              <iframe
                                src={url}
                                className="h-28 w-full rounded bg-white"
                              />
                            )}

                            {/* ACTIONS */}
                            <div className="flex gap-2 mt-2">
                              {/* VIEW */}
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center text-xs sm:text-sm bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
                              >
                                👁️ View
                              </a>

                              {/* DOWNLOAD */}
                              <a
                                href={url}
                                download
                                className="flex-1 text-center text-xs sm:text-sm bg-green-600 text-white py-1 rounded hover:bg-green-700 transition"
                              >
                                ⬇️ Download
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* DOWNLOAD ALL */}
                    {filesMap[s.id] && filesMap[s.id].length > 0 ? (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => downloadAll(s.id)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                          ⬇️ Download All Files
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-600 text-center">
                        No files uploaded
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 p-4 flex-wrap">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`
        px-3 py-1 rounded-md font-medium transition
        ${
          page === i + 1
            ? "bg-blue-600 text-white shadow"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-600"
        }
      `}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* STAT CARD */
function Stat({ icon, label, value }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex items-center gap-4">
      {icon}
      <div>
        <p className="text-sm opacity-70">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
