import { useState } from "react";
import Sidebar from "./Sidebar";
import StudentEnrollments from "./StudentEnrollments";
import DownloadReport from "./DownloadReport";

export default function AdminLayout() {
  const [activeView, setActiveView] = useState<"students" | "report">(
    "students",
  );
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState("");

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
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-80 text-center"
        >
          <h2 className="text-xl font-bold mb-4">Enter Passcode</h2>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Passcode"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login as Admin
          </button>
        </form>
      </div>
    );
  }

  // If authorized, show admin layout
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar active={activeView} onChange={setActiveView} />

      <main className="flex-1 p-6">
        {activeView === "students" && <StudentEnrollments />}
        {activeView === "report" && <DownloadReport />}
      </main>
    </div>
  );
}
