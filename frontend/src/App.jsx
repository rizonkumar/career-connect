import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import JobApplication from "./pages/JobApplication";
import RecruiterLogin from "./components/RecruiterLogin";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  const location = useLocation();

  const isDashboardRoute = location.pathname.includes("/dashboard");

  return (
    <>
      <div className="flex min-h-screen flex-col">
        {!isDashboardRoute && <NavBar />}
        <main className="flex-1 pt-16">
          {showRecruiterLogin && <RecruiterLogin />}
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/apply-job/:id/application"
              element={<JobApplication />}
            />
            <Route path="/dashboard" element={<Dashboard />}>
              {companyToken ? (
                <>
                  <Route path="manage-jobs" element={<ManageJobs />} />
                  <Route path="add-job" element={<AddJob />} />
                  <Route path="manage-jobs" element={<ManageJobs />} />
                  <Route
                    path="view-applications"
                    element={<ViewApplications />}
                  />
                </>
              ) : null}
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
