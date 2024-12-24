import { Route, Routes } from "react-router-dom";
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

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/apply-job/:id/application"
              element={<JobApplication />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
