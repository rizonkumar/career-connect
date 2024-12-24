import { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import {
  FileText,
  Edit2,
  Download,
  Trash2,
  Upload,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Building2,
  MapPin,
  Calendar,
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { jobsApplied } from "../assets/assets";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState({
    file: null,
    name: "resume.pdf",
    lastUpdated: "March 15, 2024",
  });
  const [applications, setApplications] = useState(jobsApplied);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type.includes("msword") ||
        file.type.includes("officedocument")
      ) {
        setResume({
          file: file,
          name: file.name,
          lastUpdated: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
        setIsEdit(false);
        toast.success("Resume uploaded successfully!");
      } else {
        toast.error("Please upload a PDF or DOC file");
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadResume = () => {
    if (resume.file) {
      const url = URL.createObjectURL(resume.file);
      const a = document.createElement("a");
      a.href = url;
      a.download = resume.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      toast.warning("No resume file available to download");
    }
  };

  const handleDeleteApplication = (index) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setApplications((prev) => prev.filter((_, i) => i !== index));
      toast.success("Application deleted successfully!");
    }
  };

  const handleNewApplication = () => {
    if (!resume.file) {
      toast.error("Please upload your resume first!");
      return;
    }
    window.location.href = "/";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex-1 bg-gray-50 pt-8">
        <div className="container mx-auto px-4 2xl:px-20">
          {/* Resume Section */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 className="font-urbanist text-2xl font-bold text-gray-900">
                  Your Resume
                </h2>
              </div>
              {isEdit ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEdit(false)}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <Upload className="h-4 w-4" />
                    Upload New
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEdit(true)}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDownloadResume}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              )}
            </div>

            {/* Resume Preview */}
            <div className="relative rounded-xl border-2 border-dashed border-gray-200 p-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 font-medium text-gray-900">
                    {resume.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Last updated: {resume.lastUpdated}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Applications Section */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
                <h2 className="font-urbanist text-2xl font-bold text-gray-900">
                  Job Applications
                </h2>
              </div>
              <button
                onClick={handleNewApplication}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                New Application
              </button>
            </div>

            {/* Applications Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((application, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-xl border border-gray-100 bg-white p-2">
                        <img
                          src={application.logo}
                          alt={application.company}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="line-clamp-1 font-urbanist text-lg font-semibold text-gray-900">
                          {application.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building2 className="h-4 w-4" />
                          <span>{application.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{application.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Applied on {application.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(
                        application.status,
                      )}`}
                    >
                      {getStatusIcon(application.status)}
                      {application.status}
                    </span>
                    <button
                      onClick={() => handleDeleteApplication(index)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
