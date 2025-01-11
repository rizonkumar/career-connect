import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import Logo from "../components/Logo";
import { UserButton } from "@clerk/clerk-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 z-50 w-full bg-white shadow">
        <div className="container mx-auto px-4 2xl:px-20">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <div className="flex items-center gap-6">
              <p className="text-gray-700">Welcome to Recruiter Panel</p>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={assets.company_icon}
                    alt="Company Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
