import { Download, Lock, Loader2, X } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { supabase } from "../../lib/supabase";

export default function DownloadReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Allowed passcodes
  const allowedPasscodes = [
    "raja@9065135324",
    "roshan@7717784838",
    "saurabh@7979712231",
    "niraj@8540092869",
  ];

  const handlePasscodeSubmit = async () => {
    if (!allowedPasscodes.includes(passcode.trim())) {
      setErrorMsg("❌ Invalid passcode. Authorized access only.");
      return;
    }

    setErrorMsg("");
    await downloadReport();
  };

  const downloadReport = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("student_enrollments")
      .select("*");

    if (error) {
      console.error(error.message);
      setErrorMsg("Failed to fetch data");
      setLoading(false);
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enrollments");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "student_enrollments.xlsx");

    setLoading(false);
    setIsModalOpen(false);
    setPasscode("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        Download Reports
      </h2>

      <p className="text-gray-600 mb-6 text-center md:text-left">
        Download complete student enrollment data in Excel format.
      </p>

      <div className="flex justify-center md:justify-start">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition w-full max-w-xs md:w-auto"
        >
          <Lock className="w-4 h-4" />
          Get Report
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>

            <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 justify-center md:justify-start">
              <Lock className="w-5 h-5" />
              Enter Passcode
            </h3>

            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter authorized passcode"
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errorMsg && (
              <p className="text-red-600 text-sm mb-3 text-center md:text-left">
                {errorMsg}
              </p>
            )}

            <button
              onClick={handlePasscodeSubmit}
              disabled={loading}
              className="w-full flex flex-col md:flex-row items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Report
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
