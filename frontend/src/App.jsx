import { Route, Routes } from "react-router-dom";
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
    <div>
      <NavBar />
      <main className="pt-16">
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
  );
}
