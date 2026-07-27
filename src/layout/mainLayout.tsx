import { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-app">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">

        <Navbar
          onMenuClick={() => setSidebarOpen((prev)=>!prev)}
        />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
};

export default MainLayout;