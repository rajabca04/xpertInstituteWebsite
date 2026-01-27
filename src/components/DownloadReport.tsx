import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { supabase } from "../lib/supabase";

interface Enrollment {
  full_name: string;
  email: string;
  phone: string;
  course: string;
  address: string;
  created_at: string;
}

export default function DownloadReport() {
  const [data, setData] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all enrollments
  const fetchData = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("student_enrollments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error.message);
      alert("Failed to fetch data");
    } else {
      setData(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---- CSV DOWNLOAD ----
  const downloadCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "student_enrollments.csv");
  };

  // ---- EXCEL DOWNLOAD ----
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enrollments");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "student_enrollments.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">
        Student Enrollment Report
      </h1>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={downloadCSV}
          disabled={loading || data.length === 0}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          Download CSV
        </button>

        <button
          onClick={downloadExcel}
          disabled={loading || data.length === 0}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          Download Excel
        </button>
      </div>

      {loading && <p>Loading data...</p>}

      {!loading && (
        <p className="text-gray-600">
          Total Records: <b>{data.length}</b>
        </p>
      )}
    </div>
  );
}
