import { useState } from "react";
import {
  Eye,
  EyeOff,
  MapPin,
  Calendar,
  Users,
  PenSquare,
  Trash2,
  Search,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { manageJobsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const [jobs, setJobs] = useState(manageJobsData);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleVisibilityToggle = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, visible: !job.visible } : job,
      ),
    );
  };

  const handleDelete = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Job Postings
        </h1>
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          onClick={() => navigate("/dashboard/add-job")}
        >
          <Plus className="h-4 w-4" />
          Add New Job
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  #
                </th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Job Title
                </th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Posted Date
                </th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Location
                </th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Applicants
                </th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Visible
                </th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, index) => (
                <tr
                  key={job._id}
                  className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {job.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {new Date(job.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      {job.applicants}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button
                      onClick={() => handleVisibilityToggle(job._id)}
                      className={`rounded-lg p-2 transition-colors ${
                        job.visible
                          ? "text-green-600 hover:bg-green-50"
                          : "text-gray-400 hover:bg-gray-100"
                      }`}
                    >
                      {job.visible ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50">
                        <PenSquare className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
