import { GraduationCap, Menu, X, Lock } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { supabase } from "../lib/supabase";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Array of allowed passcodes
  const allowedPasscodes = [
    "raja@9065135324",
    "roshan@7717784838",
    "saurabh@7979712231",
    "niraj@8540092869",
  ]; // add more passcodes here

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handlePasscodeSubmit = () => {
    if (allowedPasscodes.includes(passcode)) {
      setIsAuthorized(true);
      setPasscode("");
      downloadReport(); // automatically download after correct passcode
    } else {
      alert(
        "Incorrect passcode! Try again. This is only for authorized personnel.",
      );
      setIsAuthorized(false);
      setPasscode("");
    }
  };

  const downloadReport = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("student_enrollments")
      .select("*")
      // .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error.message);
      alert("Failed to fetch data");
      setLoading(false);
      return;
    }

    console.log(data)
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
    alert("Report downloaded successfully!");
    setIsModalOpen(false);
    setIsAuthorized(false);
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Xpert Institute
              </h1>
              <p className="text-xs text-gray-600">
                Empowering Education Since 2016
              </p>
            </div>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("courses")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection("partners")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Partners
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("certificates")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Certificates
            </button>
            <button
              onClick={() => scrollToSection("enroll")}
              className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Enroll Now
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              <Lock className="w-4 h-4 mr-2" />
              Get Report
            </button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("courses")}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection("partners")}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Partners
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("certificates")}
              className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-medium"
            >
              Certificates
            </button>
            <button
              onClick={() => scrollToSection("enroll")}
              className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Enroll Now
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="block w-full flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              <Lock className="w-4 h-4 mr-2" /> Get Report
            </button>
          </div>
        )}
      </nav>

      {/* Passcode Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Enter Passcode</h2>
            {!isAuthorized ? (
              <>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-blue-600"
                  onKeyDown={(e) => e.key === "Enter" && handlePasscodeSubmit()}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasscodeSubmit}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <>
                {loading ? (
                  <p>Downloading report...</p>
                ) : (
                  <p className="text-green-600 font-medium">
                    ✅ Report is downloading...
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
