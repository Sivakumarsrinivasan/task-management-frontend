import {
  LayoutDashboard,
  ClipboardList,
  User,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useUserDetail } from "../../Hooks/userDetail";
import DeleteConfirmationDialog from "../Dialog/confirmationDialog";
import { useEffect, useState } from "react";
import { userProfileDetail } from "../../Hooks/userProfileDetail";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const user = useUserDetail((state) => state);
  const logOutUser = useUserDetail((state)=>state.logOut);
  const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
   const userDetail = userProfileDetail((state)=>state.userDetail)
  
   useEffect(() => {
      getProfile();
    }, [userDetail]);
  
    const getProfile = async () => {
  

        setProfileImage(userDetail?.image)
           
    };
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

  ];
  const logout = () => {
    logOutUser();
    navigate('/');
  };
  const [confirmOpen, setConfirmOpen] = useState(false)
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
    "sidebar fixed top-0 left-0 z-50 h-screen sm:pb-[100px] w-64 sm:w-72 border-r z- shadow-2xl transition-transform duration-300 lg:static",
    open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  )}
>
  {/* Header */}
  <div className="flex items-center justify-between border-b border-custom px-4 py-3 sm:px-6 sm:py-5">
    <div>
      <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
        TaskFlow
      </h1>

      <p className="text-[11px] sm:text-xs text-muted-custom">
        Task Management
      </p>
    </div>

    <button
      onClick={onClose}
      className="rounded-lg p-2 transition hover:bg-white/10 lg:hidden"
    >
      <X size={20} />
    </button>
  </div>

  {/* Menu */}
  <nav className="mt-4 sm:mt-8 space-y-2 px-3 sm:px-4">
    {menus.map((menu) => {
      const Icon = menu.icon;

      return (
        <NavLink
          key={menu.path}
          to={menu.path}
          onClick={onClose}
          className={({ isActive }) =>
            clsx(
              "menu-item flex items-center gap-3 sm:gap-4 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-300",
              isActive && "active"
            )
          }
        >
          <Icon size={18} />
          <span className="text-sm sm:text-base font-medium">
            {menu.name}
          </span>
        </NavLink>
      );
    })}
  </nav>

  {/* Bottom */}
  <div className="absolute bottom-0 left-0 w-full border-t border-custom p-3 sm:p-5">
    <div className="mb-4 sm:mb-5 flex items-center gap-3">
      <div className="h-14 w-14 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-primary-custom">
        <img
          src={profileImage}
          alt="profile"
          className="h-full w-full object-cover"
        />
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-semibold">
          {user?.detail?.name || ""}
        </h3>

        <p className="text-[10px] sm:text-xs text-muted-custom">
          Software Developer
        </p>
      </div>
    </div>

    <button
      onClick={() => setConfirmOpen(true)}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition hover:bg-red-500"
    >
      <LogOut size={18} />
      Logout
    </button>
  </div>
</aside>

  <DeleteConfirmationDialog
    isOpen={confirmOpen}
    onClose={() => setConfirmOpen(false)}
    title="Logout confirmation"
    message="Are you sure you want to Log out?"
    onConfirm={logout}
    buttonTitle="Logout"
    buttonLoading="Wait..."
  />
</>
  );
};

export default Sidebar;