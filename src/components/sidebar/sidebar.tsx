import {
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useUserDetail } from "../../Hooks/userDetail";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const user = useUserDetail((state) => state);

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Tasks",
      icon: ClipboardList,
      path: "/tasks",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={clsx(
          "fixed lg:static top-0 left-0 z-50 h-screen w-72",
          "bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-900",
          "text-white shadow-2xl",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/20 px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              TaskFlow
            </h1>

            <p className="text-xs text-indigo-100">
              Task Management
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}

        <nav className="mt-8 px-4 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300",
                    isActive
                      ? "bg-white text-indigo-700 shadow-lg"
                      : "hover:bg-white/10"
                  )
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {menu.name}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}

        <div className="absolute bottom-0 left-0 w-full border-t border-white/20 p-5">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-700 text-lg font-bold">

              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "S"}

            </div>

            <div>

              <h3 className="font-semibold">
                {user?.name || "Siva"}
              </h3>

              <p className="text-xs text-indigo-100">
                Software Developer
              </p>

            </div>

          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 font-medium transition hover:bg-red-500"
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;