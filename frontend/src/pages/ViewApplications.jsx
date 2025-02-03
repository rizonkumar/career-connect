import { useState, useEffect, useRef } from "react";
import { viewApplicationsPageData } from "../assets/assets";
import {
  MapPin,
  Download,
  MoreHorizontal,
  Search,
  CheckCircle,
  XCircle,
  Briefcase,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

const ViewApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showActions, setShowActions] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const actionsRef = useRef(null);

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowActions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAccept = (id) => {
    console.log("accepting application", id);
    toast.success("Application accepted successfully!");
    setShowActions(null);
  };

  const handleReject = (id) => {
    console.log("rejecting application", id);
    toast.error("Application rejected!");
    setShowActions(null);
  };

  const handleDownloadResume = () => {
    toast.info("Resume downloading...");
  };

  const filteredApplications = viewApplicationsPageData
    .filter(
      (application) =>
        application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "newest") return b._id - a._id;
      return a._id - b._id;
    });

  const paginatedApplications = filteredApplications.slice(
    startIndex,
    endIndex,
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-urbanist text-2xl font-bold text-gray-900">
          View Applications
        </h1>
        <p className="mt-2 text-gray-600">Manage and review job applications</p>
      </div>

      {/* Search and Sort Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, job title, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                User name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Resume
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedApplications.length > 0 ? (
              paginatedApplications.map((application, index) => (
                <tr
                  key={application._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={application.imgSrc}
                        alt={application.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-900">
                        {application.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      {application.jobTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {application.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={handleDownloadResume}
                      className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      <Download className="h-4 w-4" />
                      Resume
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative" ref={actionsRef}>
                      <button
                        onClick={() => setShowActions(application._id)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>

                      {showActions === application._id && (
                        <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                          <button
                            onClick={() => handleAccept(application._id)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-green-600 transition-colors hover:bg-gray-50"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Accept Application
                          </button>
                          <button
                            onClick={() => handleReject(application._id)}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-gray-50"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject Application
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center">
                  <Filter className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-gray-600">No applications found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredApplications.length > 0 && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredApplications.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {filteredApplications.length}
                </span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === i + 1
                        ? "z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
