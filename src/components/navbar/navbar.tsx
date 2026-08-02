import {  LogOut, Menu, Moon, Sun, User } from "lucide-react";
import { useTheme } from "../../Hooks/theme";
import { useUserDetail } from "../../Hooks/userDetail";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from "../Dialog/confirmationDialog";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const theme = useTheme((state) => state.theme);
  const setTheme = useTheme((state) => state.setTheme);
 const [open, setOpen] = useState(false);
  const user = useUserDetail((state) => state);
  const logOutUser = useUserDetail((state) => state.logOut);
  const navigate = useNavigate();

  useEffect(()=>{
initialRenderTheme();
  },[])

  const initialRenderTheme = () =>{
    const root = document.documentElement;
    if(theme == "dark"){
     root.classList.add("dark")
    }else{
root.classList.remove("dark")
    }
  }

  const toggleTheme = () => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.remove("dark");
      setTheme("light");
    } else {
      root.classList.add("dark");
      setTheme("dark");
    }
  };

  const logout = () => {
    logOutUser();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-custom shadow-sm">

      <div className="h-16 px-6 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-input-custom transition"
          >
            <Menu size={20} className="text-main" />
          </button>

          <div>
            <h2 className="text-xl font-bold text-main">
              Task Manager
            </h2>

            <p className="text-xs text-muted-custom">
              Welcome back 👋
            </p>
          </div>

        </div>

        {/* Search */}


        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Theme */}

          <button
            onClick={toggleTheme}
            className="h-10 w-10 rounded-xl bg-input-custom border border-custom flex items-center justify-center hover:scale-105 transition"
          >
            {theme === "dark" ? (
              <Sun className="text-amber-400" size={18} />
            ) : (
              <Moon className="text-main" size={18} />
            )}
          </button>

          {/* Notification */}

          {/* <button className="relative h-10 w-10 rounded-xl bg-input-custom border border-custom flex items-center justify-center">

            <Bell
              size={18}
              className="text-main"
            />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button> */}

          {/* User */}

          <div className="hidden sm:flex items-center gap-3 rounded-xl border border-custom bg-input-custom px-3 py-2">

            <div className="h-10 w-10 rounded-full bg-primary-custom text-white flex items-center justify-center font-bold">

              {user?.detail?.name.charAt(0).toUpperCase() || (
                <User size={18} />
              )}

            </div>

            <div>

              <h3 className="text-sm font-semibold text-main">
                {user?.detail?.name || "Siva"}
              </h3>

              <p className="text-xs text-muted-custom">
                Developer
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={()=>{setOpen(true)}}
            className="flex items-center gap-2 rounded-xl bg-primary-custom hover:bg-primary-hover px-4 py-2 text-white transition"
          >

            <LogOut size={18} />

            <span className="hidden md:block">
              Logout
            </span>

          </button>

        </div>

      </div>
  <DeleteConfirmationDialog
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Logout confirmation"
            message="Are you sure you want to Log out"
            onConfirm={logout}
            buttonTitle="Logout"
            buttonLoading="wait..."
          />
    </header>
  );
};

export default Navbar;