import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import StudentEnrollments from "./StudentEnrollments";
import DownloadReport from "./DownloadReport";

export default function AdminLayout() {
  const [activeView, setActiveView] = useState<"students" | "report">("students");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle

  const correctPasscode = [
    "raja@9065135324",
    "roshan@7717784838",
    "saurabh@7979712231",
    "niraj@8540092869",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (correctPasscode.includes(passcode)) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect passcode!");
      setPasscode("");
    }
  };

  // If not authorized, show popup
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md text-center"
        >
          <h2 className="text-xl font-bold mb-4">Enter Passcode</h2>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Passcode"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Login as Admin
          </button>
        </form>
      </div>
    );
  }

  // Admin layout
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-1 right-1 z-50 bg-white p-2 rounded shadow"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar active={activeView} onChange={setActiveView} />
      </div>

      {/* Overlay for mobile when sidebar open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-0 md:p-0 md:ml-0">
        {activeView === "students" && <StudentEnrollments />}
        {activeView === "report" && <DownloadReport />}
      </main>
    </div>
  );
}
