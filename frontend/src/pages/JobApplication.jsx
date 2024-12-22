import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  ArrowLeft,
  Mail,
  Phone,
  Upload,
  CheckCircle,
  Send,
} from "lucide-react";

const JobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (
      file.type === "application/pdf" ||
      file.type.includes("msword") ||
      file.type.includes("officedocument")
    ) {
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    } else {
      alert("Please upload a PDF or DOC file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your submission logic here
    navigate(-1);
  };

  const canProceedToStep2 = () => {
    return formData.fullName && formData.email && formData.phone;
  };

  const canProceedToStep3 = () => {
    return selectedFile !== null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Application Form
              </h1>
              <p className="text-sm text-gray-600">
                Full Stack Developer at Slack
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8 flex justify-between">
          <div className="flex flex-1 items-center">
            <div
              className={`h-10 w-10 rounded-full ${
                formStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              } flex items-center justify-center font-semibold`}
            >
              1
            </div>
            <div className="h-1 flex-1 bg-gray-200">
              <div
                className={`h-full ${
                  formStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                } transition-all`}
                style={{ width: formStep > 1 ? "100%" : "0%" }}
              />
            </div>
          </div>
          <div className="flex flex-1 items-center">
            <div
              className={`h-10 w-10 rounded-full ${
                formStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
              } flex items-center justify-center font-semibold`}
            >
              2
            </div>
            <div className="h-1 flex-1 bg-gray-200">
              <div
                className={`h-full ${
                  formStep >= 3 ? "bg-blue-600" : "bg-gray-200"
                } transition-all`}
                style={{ width: formStep > 2 ? "100%" : "0%" }}
              />
            </div>
          </div>
          <div
            className={`h-10 w-10 rounded-full ${
              formStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
            } flex items-center justify-center font-semibold`}
          >
            3
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit}>
            {formStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 flex rounded-lg border border-gray-300 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                      <div className="flex items-center pl-3">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="block w-full rounded-r-lg border-0 px-3 py-3 focus:outline-none focus:ring-0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1 flex rounded-lg border border-gray-300 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                      <div className="flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-r-lg border-0 px-3 py-3 focus:outline-none focus:ring-0"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1 flex rounded-lg border border-gray-300 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                      <div className="flex items-center pl-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="block w-full rounded-r-lg border-0 px-3 py-3 focus:outline-none focus:ring-0"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => canProceedToStep2() && setFormStep(2)}
                    className={`rounded-lg px-8 py-3 font-medium ${
                      canProceedToStep2()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "cursor-not-allowed bg-gray-200 text-gray-500"
                    }`}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Upload Resume</h2>
                <div
                  className={`mt-1 flex items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          name="resume"
                          onChange={handleFileChange}
                          className="sr-only"
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                    {selectedFile && (
                      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span>{selectedFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="rounded-lg border border-gray-200 px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => canProceedToStep3() && setFormStep(3)}
                    className={`rounded-lg px-8 py-3 font-medium ${
                      canProceedToStep3()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "cursor-not-allowed bg-gray-200 text-gray-500"
                    }`}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Cover Letter</h2>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Why are you interested in this position?"
                  required
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="rounded-lg border border-gray-200 px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    <Send className="h-5 w-5" />
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;
