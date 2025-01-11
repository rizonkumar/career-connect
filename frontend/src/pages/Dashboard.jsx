import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Logo from "../components/Logo";
import { UserButton, useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import {
  LogOut,
  PlusCircle,
  LayoutGrid,
  ClipboardList,
  Menu,
  X,
  Building2,
} from "lucide-react";

const Dashboard = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };

  const navLinks = [
    {
      path: "/dashboard/add-job",
      icon: <PlusCircle className="h-5 w-5" />,
      label: "Add Job",
    },
    {
      path: "/dashboard/manage-jobs",
      icon: <LayoutGrid className="h-5 w-5" />,
      label: "Manage Jobs",
    },
    {
      path: "/dashboard/view-applications",
      icon: <ClipboardList className="h-5 w-5" />,
      label: "View Applications",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full bg-white shadow">
        <div className="container mx-auto px-4 2xl:px-20">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <div onClick={() => navigate("/")} className="cursor-pointer">
                <Logo />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="hidden text-gray-700 md:block">
                Welcome to Recruiter Panel
              </p>
              <div className="hidden h-8 w-px bg-gray-200 md:block" />
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="h-8 w-8 cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-blue-500"
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                  >
                    <img
                      src={assets.company_icon}
                      alt="Company Logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  {showLogout && (
                    <div
                      className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                      onMouseEnter={() => setShowLogout(true)}
                      onMouseLeave={() => setShowLogout(false)}
                    >
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16">
        <div className="flex">
          {/* Enhanced Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-white pt-16 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-full flex-col">
              {/* Sidebar Header */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <h2 className="font-semibold text-gray-800">Dashboard</h2>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-1 px-3 py-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="flex h-6 w-6 items-center justify-center">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                  <div className="h-8 w-8 overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={assets.company_icon}
                      alt="Company Logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Your Company
                    </p>
                    <p className="text-xs text-gray-500">Recruiter Account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden p-6 lg:ml-72">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
