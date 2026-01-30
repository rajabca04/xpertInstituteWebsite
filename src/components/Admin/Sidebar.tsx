import { Download, Folder, LogOut } from "lucide-react";

interface SidebarProps {
  active: string;
  onChange: (key: string) => void;
  onLogout: () => void;
}

const sidebarItems = [
  {
    key: "students",
    label: "All Student Enrollments",
    icon: Folder,
  },
  {
    key: "report",
    label: "Download Report",
    icon: Download,
  },
];

export default function Sidebar({
  active,
  onChange,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-blue-700 text-white flex flex-col h-full md:h-screen">
      {/* LOGO */}
      <div className="flex items-center justify-center h-20 border-b border-blue-600 flex-shrink-0">
        <h1 className="text-xl font-bold">Xpert Institute</h1>
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;

          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition
                ${
                  isActive
                    ? "bg-blue-600 shadow"
                    : "hover:bg-blue-600/80"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="border-t border-blue-600 p-4 flex-shrink-0">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-white-500 hover:bg-red-600/20 hover:bg-white hover:text-red-700 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-lg font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
