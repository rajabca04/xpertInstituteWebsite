import { useEffect, useState } from "react";
import { Menu, X, Loader2 } from "lucide-react";

import Sidebar from "./Sidebar";
import StudentEnrollments from "./StudentEnrollments";
import DownloadReport from "./DownloadReport";
import { supabase } from "../../lib/supabase";

export default function AdminLayout() {
  const [activeView, setActiveView] = useState<"students" | "report">(
    "students"
  );
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= VERIFY PASSCODE ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passcode.trim()) {
      setError("Enter passcode");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("admin_passcodes")
        .select("id, used_count")
        .eq("passcode", passcode.trim())
        .eq("is_active", true)
        .single();

      if (error || !data) {
        setError("❌ Invalid or inactive passcode");
        setPasscode("");
        return;
      }

      // update usage
      await supabase
        .from("admin_passcodes")
        .update({
          used_count: (data.used_count ?? 0) + 1,
          last_used_at: new Date().toISOString(),
        })
        .eq("id", data.id);

      localStorage.setItem(
        "admin_auth",
        JSON.stringify({ id: data.id, time: Date.now() })
      );

      setIsAuthorized(true);
    } catch (err) {
      console.error(err);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= AUTO LOGIN ================= */
  useEffect(() => {
    const saved = localStorage.getItem("admin_auth");
    if (saved) {
      setIsAuthorized(true);
    }
  }, []);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthorized(false);
    setPasscode("");
  };

  /* ================= LOGIN PAGE ================= */
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter Passcode"
            className="w-full border rounded-md px-3 py-2 mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden fixed top-1 left-4 z-50 bg-transparent text-yellow-700 font-semibold p-1 rounded-md shadow"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
          transform transition-transform duration-300
          md:relative md:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        {/* Make sidebar scrollable if content is long */}
        <div className="flex-1 overflow-y-auto">
          <Sidebar
            active={activeView}
            onChange={(view) => {
              setActiveView(view);
              setIsSidebarOpen(false);
            }}
            onLogout={logout}
          />
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-0 md:p-0 overflow-y-auto h-screen">
        {activeView === "students" && <StudentEnrollments />}
        {activeView === "report" && <DownloadReport />}
      </main>
    </div>
  );
}
