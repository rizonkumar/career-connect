import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import {
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Send,
  Building2,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { jobs } = useContext(AppContext);

  const handleSimilarJobClick = (jobId) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/apply-job/${jobId}`);
  };

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fetchJobData = async () => {
    setIsLoading(true);
    try {
      const data = jobs.find((job) => job._id === id);
      setJobData(data);
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJobData();
    }
  }, [id, jobs]);

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
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!jobData) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Job Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white px-4 py-8">
      <div className="container mx-auto max-w-7xl 2xl:px-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - Job Details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Job Header Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                    <img
                      src={jobData.companyId.image}
                      alt={jobData.companyId.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="font-urbanist text-3xl font-bold text-gray-900">
                      {jobData.title}
                    </h1>
                    <div className="mt-2 flex items-center gap-2 text-gray-600">
                      <Building2 className="h-4 w-4" />
                      <span>{jobData.companyId.name}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/apply-job/${id}/application`}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition duration-300 ease-out hover:bg-blue-700"
                >
                  <span className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Apply Now
                  </span>
                </Link>
              </div>

              {/* Job Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="group rounded-xl bg-gray-50 p-4 transition-all hover:bg-blue-50">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">
                      Location
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-gray-900">
                    {jobData.location}
                  </p>
                </div>
                <div className="group rounded-xl bg-gray-50 p-4 transition-all hover:bg-blue-50">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">
                      Salary
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-gray-900">
                    ${jobData.salary.toLocaleString()}/year
                  </p>
                </div>
                <div className="group rounded-xl bg-gray-50 p-4 transition-all hover:bg-blue-50">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">
                      Job Type
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-gray-900">Full Time</p>
                </div>
                <div className="group rounded-xl bg-gray-50 p-4 transition-all hover:bg-blue-50">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">
                      Posted
                    </span>
                  </div>
                  <p className="mt-2 font-medium text-gray-900">2 days ago</p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl md:p-8">
              <h2 className="font-urbanist text-2xl font-bold text-gray-900">
                Job Description
              </h2>
              <div className="prose mt-6 max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: jobData.description }}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Company Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
              <h3 className="font-urbanist text-xl font-bold text-gray-900">
                About the Company
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">1000+ Employees</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">
                    Headquarters in {jobData.location}
                  </span>
                </div>
                <Link
                  to="#"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                >
                  View Company Profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
              <h3 className="font-urbanist text-xl font-bold text-gray-900">
                Similar Jobs
              </h3>
              <div className="mt-4 space-y-4">
                {jobs
                  .filter(
                    (j) => j._id !== id && j.category === jobData.category,
                  )
                  .slice(0, 3)
                  .map((job) => (
                    <div
                      key={job._id}
                      onClick={() => handleSimilarJobClick(job._id)}
                      className="cursor-pointer rounded-xl border border-gray-100 p-4 transition-all hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-md"
                    >
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {job.companyId.name} • {job.location}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-600">
                          ${job.salary.toLocaleString()} - $
                          {(job.salary * 1.2).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          • Full Time
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
